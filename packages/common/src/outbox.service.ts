import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { NatsClient } from './nats.client';
import { CloudEventBuilder } from './cloud-event.builder';

// Transactional Outbox pattern: events are written to the outbox table
// in the same DB transaction as the business change, then a relay worker
// publishes them to NATS JetStream and marks them PUBLISHED.
//
// This guarantees at-least-once delivery without 2PC.
// Each service that publishes events must:
//   1. Include the OutboxEvent model in its Prisma schema.
//   2. Inject OutboxService and call .publish() inside a $transaction.
//   3. The relay loop below runs every 2s, draining PENDING rows.
@Injectable()
export class OutboxService implements OnModuleInit {
  private readonly logger = new Logger(OutboxService.name);
  private relayTimer: NodeJS.Timeout | null = null;
  private readonly serviceName: string;

  constructor(
    private readonly prisma: PrismaClient,
    private readonly nats: NatsClient,
  ) {
    this.serviceName = process.env.SERVICE_NAME || 'unknown';
  }

  onModuleInit(): void {
    // Start the relay worker with a 2-second tick.
    this.relayTimer = setInterval(() => this.drainOutbox().catch((e) =>
      this.logger.error(`Outbox drain failed: ${e.message}`)
    ), 2000);
  }

  // Writes an event to the outbox. MUST be called inside a $transaction.
  // Pass tx as the second arg when used inside prisma.$transaction(async (tx) => ...).
  async publish<T>(
    subject: string,
    data: T,
    tx?: any,
  ): Promise<void> {
    const event = CloudEventBuilder.build(subject, data, this.serviceName);
    const client = tx || this.prisma;
    await client.outboxEvent.create({
      data: {
        event_type: subject,
        payload: event as any,
        status: 'PENDING',
        created_at: new Date(),
      },
    });
  }

  // Drains pending events in batches of 50, publishes to NATS, marks PUBLISHED.
  private async drainOutbox(): Promise<void> {
    const pending = await this.prisma.outboxEvent.findMany({
      where: { status: 'PENDING' },
      take: 50,
      orderBy: { created_at: 'asc' },
    });
    if (pending.length === 0) return;

    for (const evt of pending) {
      try {
        const payload = Buffer.from(JSON.stringify(evt.payload));
        await this.nats.publish(evt.event_type, payload);
        await this.prisma.outboxEvent.update({
          where: { id: evt.id },
          data: { status: 'PUBLISHED', published_at: new Date(), attempts: { increment: 1 } },
        });
      } catch (err: any) {
        this.logger.warn(`Publish failed for event ${evt.id}: ${err.message}`);
        await this.prisma.outboxEvent.update({
          where: { id: evt.id },
          data: { attempts: { increment: 1 } },
        }).catch(() => {});
      }
    }
  }
}
