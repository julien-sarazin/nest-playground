import { Module } from '@nestjs/common';
import { TokensModule } from './modules/tokens/tokens.module';
import { ConsulModule } from '../../shared/modules/consul/src';
import { CONSUL_CLIENT_CONFIG, CONSUL_SERVICE_CONFIG } from './config/consul';

@Module({
    imports: [
        TokensModule,
        ConsulModule.init({ connect: CONSUL_CLIENT_CONFIG, register: CONSUL_SERVICE_CONFIG }),
    ],
})
export class AppModule {
}
