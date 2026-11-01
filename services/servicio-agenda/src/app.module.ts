import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NatsModule } from '@telemed/common';
import { PrismaModule } from './prisma.module';
import { AgendaModule } from './agenda.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NatsModule,
    PrismaModule,
    AgendaModule,
  ],
})
export class AppModule {}
