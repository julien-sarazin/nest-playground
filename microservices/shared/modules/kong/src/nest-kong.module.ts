import { DynamicModule, Global, Module } from '@nestjs/common';
import { KongModuleConfiguration } from './interfaces';
import { KONG_CLIENT_PROVIDER, KONG_CONFIGURATION_PROVIDER, KONG_SERVICE_PROVIDER } from './constants';
import { Kong } from './classes/KongClient';
import { NestKongService } from './nest-kong.service';

@Global()
@Module({})
export class NestKongModule {

    static init(options: KongModuleConfiguration): DynamicModule {

        const kongConfigurationProvider = {
            provide: KONG_CONFIGURATION_PROVIDER,
            useFactory: (): KongModuleConfiguration => {
                /**
                 * TODO: lean the configuration with default properties.
                 */
                return options;
            },
        };

        /**
         * Configure kong client by connecting to the client agent
         * and register the current API if configuration is provided.
         */
        const kongClientProvider = {
            provide: KONG_CLIENT_PROVIDER,
            useFactory: async (): Promise<any> => {
                return await new Kong(options.kong);
            },
        };
        const kongServiceProvider = {
            provide: KONG_SERVICE_PROVIDER,
            useFactory: async (kongClient: Kong, kongConfiguration: KongModuleConfiguration): Promise<NestKongService> => {
                return new NestKongService(kongClient, kongConfiguration);
            },
            inject: [KONG_CLIENT_PROVIDER, KONG_CONFIGURATION_PROVIDER],
        };

        return {
            module: NestKongModule,
            providers: [kongConfigurationProvider, kongClientProvider, kongServiceProvider],
            exports: [kongServiceProvider],
        };
    }
}
