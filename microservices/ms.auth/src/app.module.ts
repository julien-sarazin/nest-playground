import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TokensModule } from './modules/tokens/tokens.module';
import { HealthModule } from './modules/health/health.module';
import { CONSUL_CONFIG } from './config/consul.development';
import { NestConsulModule } from '@shared/modules/consul/src';
import * as morgan from 'morgan';
import { TokensController } from './modules/tokens/controller/tokens.controller';

@Module({
    imports: [
        HealthModule,
        TokensModule,
        NestConsulModule.init(CONSUL_CONFIG),
    ],
})
export class ApplicationModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(morgan('tiny'))
          .forRoutes(TokensController);
    }
}
