import { DynamicModule, Global, Module } from '@nestjs/common';
import * as Consul from 'consul';
import { ConsulService } from './service';
import { CONSUL_CLIENT_PROVIDER, CONSUL_CONFIGURATION_PROVIDER, CONSUL_SERVICE_PROVIDER } from './constants';
import { ConsulModuleConfiguration } from './interfaces';

@Global()
@Module({})
export class ConsulModule {

    static init(options: ConsulModuleConfiguration): DynamicModule {
        /**
         * Forcing the promisification
         */
        options.connect.promisify = true;

        const consulConfigurationProvider = {
            provide: CONSUL_CONFIGURATION_PROVIDER,
            useFactory: (): ConsulModuleConfiguration => {
                /**
                 * TODO: lean the configuration with default properties.
                 */
                return options;
            },
        };

        const consulClientProvider = {
            provide: CONSUL_CLIENT_PROVIDER,
            useFactory: async (): Promise<any> => {
                /*
                 * In all cases we suppose the service will connect to the consul agent
                 */
                const consul = await new Consul(options.connect);
                /*
                 * But the service might not need to be registered in the consul catalog.
                 * We let the developer choose either he prefers use the service name
                 * or complete a full exhaustive service description.
                 */
                if (options.register) {
                    const registerOptions = (typeof options.register === 'string')
                      ? { name: options.register }
                      : options.register;

                    console.log('> registering:', registerOptions);
                    await consul.agent.service
                      .register(registerOptions);
                    console.log('> registered successfully.');
                }

                return consul;
            },
        };

        const consulServiceProvider = {
            provide: CONSUL_SERVICE_PROVIDER,
            useFactory: async (consulClient: any, consulConfiguration: ConsulModuleConfiguration): Promise<ConsulService> => {
                return new ConsulService(consulClient, consulConfiguration);
            },
            inject: [CONSUL_CLIENT_PROVIDER, CONSUL_CONFIGURATION_PROVIDER],
        };

        return {
            module: ConsulModule,
            providers: [consulConfigurationProvider, consulClientProvider, consulServiceProvider],
            exports: [consulServiceProvider],
        };
    }
}
