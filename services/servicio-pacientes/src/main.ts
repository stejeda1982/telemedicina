import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { CorrelationIdInterceptor } from './correlation.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: false });
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT', 3002);

  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: config.get<string[]>('CORS_ORIGINS', ['*']),
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, forbidNonWhitelisted: true,
    transform: true, transformOptions: { enableImplicitConversion: true },
  }));
  app.useGlobalInterceptors(new CorrelationIdInterceptor());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Servicio Pacientes')
    .setDescription('API REST del microservicio pacientes - Plataforma de Telemedicina')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  Logger.log(`🚀 servicio-pacientes running on http://localhost:${3002}/api/v1`, 'Bootstrap');
  Logger.log(`📚 Swagger UI at http://localhost:${3002}/docs`, 'Bootstrap');
}
bootstrap();
