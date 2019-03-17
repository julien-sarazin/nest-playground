import { FastifyAdapter, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  app.setGlobalPrefix('api');

  await app.listen(3001);
}

bootstrap()
  .then(() => console.log('> "Users service" listening on port', 3001));
