import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ApplicationModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(ApplicationModule, new FastifyAdapter());
    await app.listen(process.env.PORT);
}

if (isNaN(parseInt(process.env.PORT))) {
    console.error('No port provided. 👏');
    process.exit(666);
}

bootstrap().then(() => console.log('👍: ', process.env.PORT));
