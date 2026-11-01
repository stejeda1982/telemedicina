import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NatsModule } from '@telemed/common';
import { NatsSubscriberService } from './nats-subscriber.service';
import { PrismaModule } from './prisma.module';
import { NotificacionesModule } from './notificaciones.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NatsModule,
    PrismaModule,
    NotificacionesModule,
  ],
})
export class AppModule {}
