import { FastifyAdapter, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONSUL_CONFIG } from './config/consul.development';

const service = CONSUL_CONFIG.service;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  app.setGlobalPrefix('api');

  await app.listen(service.port);
}

bootstrap()
  .then(() => console.log('> "Users service" listening on port', service.port));
