import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { HealthModule } from './modules/health/health.module';
import { UsersController } from './modules/users/controller/users.controller';
import * as morgan from 'morgan';
import { NestKongModule } from '@shared/modules/kong/src/nest-kong.module';
import { HealthController } from './modules/health/health.controller';
import { KONG_CONFIG } from './config/kong.development';

@Module({
    imports: [
        UsersModule,
        HealthModule,
        NestKongModule.init(KONG_CONFIG),
    ],
})
export class ApplicationModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(morgan('tiny'))
          .forRoutes(UsersController)

          .apply(morgan('tiny'))
          .forRoutes(HealthController);
    }
}
