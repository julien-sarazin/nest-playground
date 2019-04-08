import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TokensModule } from './modules/tokens/tokens.module';
import { HealthModule } from './modules/health/health.module';
import * as morgan from 'morgan';
import { TokensController } from './modules/tokens/controller/tokens.controller';
import { HealthController } from './modules/health/health.controller';
import { NestKongModule } from '@shared/modules/kong/src';
import { KONG_CONFIG } from './config/kong.development';

@Module({
    imports: [
        HealthModule,
        TokensModule,
        NestKongModule.init(KONG_CONFIG),
    ],
})
export class ApplicationModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(morgan('tiny'))
          .forRoutes(TokensController)

          .apply(morgan('tiny'))
          .forRoutes(HealthController);
    }
}
