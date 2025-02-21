import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import * as express from 'express';
const logger = new Logger('MainBootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });
  const passSwagger = process.env.SWAGGER_PASS;
  const config = new DocumentBuilder()
    .setTitle('Gestión de glosas')
    .setDescription('gestión de glosas descripción de servicios.')
    .setVersion('0.1')
    .addTag('gestion-glosas')
    .addBearerAuth()
    .build();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors({
    origin: process.env.APP_CLIENT,
    credentials: true,
  });
  app.use(
    ['/cs/docs', '/cs/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        glosas: passSwagger,
      },
    }),
  );
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('cs/docs', app, document);
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  await app.listen(process.env.PORT || 4000);
  logger.log(`application started on port: ${process.env.PORT || 4000}`);
}
bootstrap();
