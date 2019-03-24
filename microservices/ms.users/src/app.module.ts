import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { HealthModule } from './modules/health/health.module';
import { ConsulModule } from '../../shared/modules/consul/src';
import { CONSUL_CONFIG } from './config/consul.development';

@Module({
    imports: [
        UsersModule,
        HealthModule,
        ConsulModule.init(CONSUL_CONFIG),
    ],
})
export class AppModule {
}
