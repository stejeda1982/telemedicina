import { Module } from '@nestjs/common';
import { MensajeriaController } from './mensajeria.controller';
import { MensajeriaService } from './mensajeria.service';

@Module({
  controllers: [MensajeriaController],
  providers: [MensajeriaService],
  exports: [MensajeriaService],
})
export class MensajeriaModule {}
