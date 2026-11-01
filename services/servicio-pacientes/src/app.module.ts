import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NatsModule } from '@telemed/common';
import { PrismaModule } from './prisma.module';
import { PacientesModule } from './pacientes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NatsModule,
    PrismaModule,
    PacientesModule,
  ],
})
export class AppModule {}
