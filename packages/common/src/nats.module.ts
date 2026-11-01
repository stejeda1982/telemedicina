import { Module, Global } from '@nestjs/common';
import { NatsClient } from './nats.client';
import { OutboxService } from './outbox.service';

@Global()
@Module({
  providers: [NatsClient, OutboxService],
  exports: [NatsClient, OutboxService],
})
export class NatsModule {}
