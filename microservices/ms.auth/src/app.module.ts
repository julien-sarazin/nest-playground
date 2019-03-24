import { Module } from '@nestjs/common';
import { TokensModule } from './modules/tokens/tokens.module';
import { ConsulModule } from '../../shared/modules/consul/src';
import { HealthModule } from './modules/health/health.module';
import { CONSUL_CONFIG } from './config/consul.development';

@Module({
    imports: [
        HealthModule,
        TokensModule,
        ConsulModule.init(CONSUL_CONFIG),
    ],
})
export class AppModule {
}
