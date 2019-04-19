import { Module } from '@nestjs/common';
import { PartnersModule } from './modules/partners/partners.module';
import { HealthModule } from './modules/health/health.module';
import { NestKongModule } from '@shared/modules/kong/src';
import { KONG_CONFIG } from './config/kong.development';
import { CONSUL_CONFIG } from './config/consul.development';
import { NestConsulModule } from '@shared/modules/consul';

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
