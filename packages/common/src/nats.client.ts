import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect, NatsConnection, JetStreamClient, JetStreamManager } from 'nats';

// Wraps a NATS JetStream connection. Singleton per service.
// Streams are created lazily on first publish/subscribe if missing.
@Injectable()
export class NatsClient implements OnModuleInit, OnModuleDestroy {
  private nc!: NatsConnection;
  private js!: JetStreamClient;
  private jsm!: JetStreamManager;
  private readonly logger = new Logger(NatsClient.name);
  private readonly streamName = 'TELEMED_EVENTS';

  constructor(private readonly config: ConfigService) {}

  async onModuleInit(): Promise<void> {
    const url = this.config.get<string>('NATS_URL', 'nats://localhost:4222');
    this.nc = await connect({
      servers: url,
      name: `svc-${this.config.get<string>('SERVICE_NAME', 'unknown')}`,
      maxReconnectAttempts: -1,
    });
    this.js = this.nc.jetstream();
    this.jsm = await this.nc.jetstreamManager();
    await this.ensureStream();
    this.logger.log(`Connected to NATS JetStream at ${url}`);
  }

  async onModuleDestroy(): Promise<void> {
    await this.nc?.close();
  }

  get jetstream(): JetStreamClient {
    return this.js;
  }

  get connection(): NatsConnection {
    return this.nc;
  }

  // Publishes a CloudEvent to the configured subject. JetStream persists it.
  async publish(subject: string, payload: Uint8Array): Promise<void> {
    try {
      await this.js.publish(subject, payload);
    } catch (err: any) {
      this.logger.error(`Failed to publish to ${subject}: ${err.message}`);
      throw err;
    }
  }

  // Subscribes to a subject on the TELEMED_EVENTS stream with durable consumer.
  async subscribe(subject: string, durable: string, handler: (data: any) => Promise<void>): Promise<void> {
    const opts = { durable, filter_subject: subject, ack_wait: 30000, max_deliver: 5 };
    await this.jsm.consumers.add(this.streamName, opts);
    const consumer = this.js.consumers.get(this.streamName, durable);
    const messages = await consumer.consume({ max_messages: 100 });
    (async () => {
      for await (const m of messages) {
        try {
          const data = JSON.parse(new TextDecoder().decode(m.data));
          await handler(data);
          m.ack();
        } catch (err: any) {
          this.logger.error(`Handler error on ${subject}: ${err.message}`);
          m.nak();
        }
      }
    })();
  }

  private async ensureStream(): Promise<void> {
    try {
      await this.jsm.streams.info(this.streamName);
    } catch {
      await this.jsm.streams.add({
        name: this.streamName,
        subjects: ['telemedicina.>'],
        retention: 'limits',
        max_age: 60 * 60 * 24 * 30 * 1e9, // 30 days in ns
        storage: 'file',
      });
      this.logger.log(`Created NATS stream ${this.streamName}`);
    }
  }
}
