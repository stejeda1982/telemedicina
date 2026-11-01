import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT', 4002);
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: config.get<string[]>('CORS_ORIGINS', ['http://localhost:3000']),
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('BFF Profesional')
    .setDescription('Backend for Frontend - audiencia: profesionales')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('docs', app, swaggerConfig);
  await app.listen(port);
  Logger.log(`🚀 BFF Profesional on http://localhost:$4002/api/v1`, 'Bootstrap');
}
bootstrap();
