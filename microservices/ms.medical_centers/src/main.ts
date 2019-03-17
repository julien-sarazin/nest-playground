import { FastifyAdapter, NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, new FastifyAdapter());
  app.setGlobalPrefix('api');

  await app.listen(3000);
}

bootstrap()
  .then(() => console.log('> "Medical Centers service" listening on port', 3000));
