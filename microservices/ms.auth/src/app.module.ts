import { Module } from '@nestjs/common';
import { TokensModule } from './modules/tokens/tokens.module';
import { HealthModule } from './modules/health/health.module';
import { CONSUL_CONFIG } from './config/consul.development';
import { NestConsulModule } from '@shared/modules/consul';

@Module({
    imports: [
        HealthModule,
        TokensModule,
        NestConsulModule.init(CONSUL_CONFIG),
    ],
})
export class AppModule {
}
