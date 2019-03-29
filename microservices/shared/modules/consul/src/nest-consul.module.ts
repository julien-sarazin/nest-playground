import { DynamicModule, Global, Module } from '@nestjs/common';
import * as Consul from 'consul';
import { NestConsulService } from './nest-consul.service';
import { CONSUL_CLIENT_PROVIDER, CONSUL_CONFIGURATION_PROVIDER, CONSUL_SERVICE_PROVIDER } from './constants';
import { ConsulModuleConfiguration } from './interfaces';

@Global()
@Module({})
export class NestConsulModule {

    static init(options: ConsulModuleConfiguration): DynamicModule {
        /**
         * Forcing the promisification
         */
        options.consul.promisify = true;

        const consulConfigurationProvider = {
            provide: CONSUL_CONFIGURATION_PROVIDER,
            useFactory: (): ConsulModuleConfiguration => {
                /**
                 * TODO: lean the configuration with default properties.
                 */
                return options;
            },
        };

        /**
         * Configure consul client by connecting to the client agent
         * and register the current API if configuration is provided.
         */
        const consulClientProvider = {
            provide: CONSUL_CLIENT_PROVIDER,
            useFactory: async (): Promise<any> => {
                return await new Consul(options.consul);
            },
        };
        const consulServiceProvider = {
            provide: CONSUL_SERVICE_PROVIDER,
            useFactory: async (consulClient: Consul.Consul, consulConfiguration: ConsulModuleConfiguration): Promise<NestConsulService> => {
                return new NestConsulService(consulClient, consulConfiguration);
            },
            inject: [CONSUL_CLIENT_PROVIDER, CONSUL_CONFIGURATION_PROVIDER],
        };

        return {
            module: NestConsulModule,
            providers: [consulConfigurationProvider, consulClientProvider, consulServiceProvider],
            exports: [consulServiceProvider],
        };
    }
}
