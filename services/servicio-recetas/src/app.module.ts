import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NatsModule } from '@telemed/common';
import { PrismaModule } from './prisma.module';
import { RecetasModule } from './recetas.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NatsModule,
    PrismaModule,
    RecetasModule,
  ],
})
export class AppModule {}
