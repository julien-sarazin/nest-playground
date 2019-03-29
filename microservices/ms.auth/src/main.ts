import { NestFactory } from '@nestjs/core';
import { CONSUL_CONFIG } from './config/consul.development';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ApplicationModule } from './app.module';

const service = CONSUL_CONFIG.service;

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(ApplicationModule, new FastifyAdapter());
    app.setGlobalPrefix('api');

    await app.listen(service.port);
}

bootstrap().then(() => console.log('👍: ', service.port));
