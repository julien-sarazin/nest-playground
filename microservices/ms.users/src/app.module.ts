import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { HealthModule } from './modules/health/health.module';
import { NestKongModule } from '@shared/modules/kong/src/nest-kong.module';
import { KONG_CONFIG } from './config/kong.development';
import { NestConsulModule } from '@shared/modules/consul';
import { CONSUL_CONFIG } from './config/consul.development';

@Module({
    imports: [
        UsersModule,
        HealthModule,
        NestKongModule.init(KONG_CONFIG),
        NestConsulModule.init(CONSUL_CONFIG),
    ],
})

export class ApplicationModule {
}
