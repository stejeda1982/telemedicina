import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NatsModule } from '@telemed/common';
import { AuditoriaSubscriberService } from './auditoria-subscriber.service';
import { PrismaModule } from './prisma.module';
import { AuditoriaModule } from './auditoria.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NatsModule,
    PrismaModule,
    AuditoriaModule,
  ],
})
export class AppModule {}
