import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { HealthModule } from './modules/health/health.module';
import { NestConsulModule } from '@shared/modules/consul/src';
import { CONSUL_CONFIG } from './config/consul.development';
import { UsersController } from './modules/users/controller/users.controller';
import * as morgan from 'morgan';

@Module({
    imports: [
        UsersModule,
        HealthModule,
        NestConsulModule.init(CONSUL_CONFIG),
    ],
})
export class ApplicationModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(morgan('tiny'))
          .forRoutes(UsersController);
    }
}
