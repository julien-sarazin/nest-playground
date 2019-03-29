import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { HealthModule } from './modules/health/health.module';
import { NestConsulModule } from '@shared/modules/consul/src';
import { CONSUL_CONFIG } from './config/consul.development';

@Module({
    imports: [
        UsersModule,
        HealthModule,
        NestConsulModule.init(CONSUL_CONFIG),
    ],
})
export class ApplicationModule {
}
