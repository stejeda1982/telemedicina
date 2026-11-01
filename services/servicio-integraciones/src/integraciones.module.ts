import { Module } from '@nestjs/common';
import { IntegracionesController } from './integraciones.controller';
import { IntegracionesService } from './integraciones.service';

@Module({
  controllers: [IntegracionesController],
  providers: [IntegracionesService],
  exports: [IntegracionesService],
})
export class IntegracionesModule {}
