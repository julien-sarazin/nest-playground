import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ApplicationModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(ApplicationModule, new FastifyAdapter());
    await app.listen(process.env.PORT);
}

bootstrap().then(() => console.log('👍: ', process.env.PORT));
