import { Module } from '@nestjs/common';
import { PartnersModule } from './modules/partners/partners.module';
import { HealthModule } from './modules/health/health.module';
import { NestKongModule } from '@shared/modules/kong/src';
import { KONG_CONFIG } from './config/kong.config';
import { CONSUL_CONFIG } from './config/consul.config';
import { NestConsulModule } from '@shared/modules/consul/src';

@Module({
    imports: [
        HealthModule,
        PartnersModule,
        NestKongModule.init(KONG_CONFIG),
        NestConsulModule.init(CONSUL_CONFIG),
    ],
})
export class ApplicationModule {
}
