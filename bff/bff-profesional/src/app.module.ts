import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BffController } from './bff.controller';
import { BffService } from './bff.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [BffController],
  providers: [BffService],
})
export class AppModule {}
