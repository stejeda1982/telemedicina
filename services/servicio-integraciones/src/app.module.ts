import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NatsModule } from '@telemed/common';
import { PrismaModule } from './prisma.module';
import { IntegracionesModule } from './integraciones.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NatsModule,
    PrismaModule,
    IntegracionesModule,
  ],
})
export class AppModule {}
