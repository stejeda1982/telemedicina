import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NatsModule } from '@telemed/common';
import { PrismaModule } from './prisma.module';
import { MensajeriaModule } from './mensajeria.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NatsModule,
    PrismaModule,
    MensajeriaModule,
  ],
})
export class AppModule {}
