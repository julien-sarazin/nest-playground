import { Inject, Injectable, Logger, LoggerService, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as Consul from 'consul';
import { get } from 'lodash';
import { CONSUL_CLIENT_PROVIDER, CONSUL_CONFIGURATION_PROVIDER } from './constants';
import uuid = require('uuid');

@Injectable()
export class ConsulService implements OnModuleInit, OnModuleDestroy {
    private logger: LoggerService;

    private readonly serviceId: string;
    private readonly serviceName: string;
    private readonly servicePort: number;
    private readonly serviceHost: string;

    private tries: number;
    private readonly maxRetry: number;
    private readonly retryInterval: number;

    constructor(
      @Inject(CONSUL_CLIENT_PROVIDER) private readonly consul: Consul.Consul,
      @Inject(CONSUL_CONFIGURATION_PROVIDER) private readonly configuration: any,
      ) {
        this.logger = new Logger();
        this.serviceId = get(configuration, 'service.id', uuid.v4());
        this.serviceName = get(configuration, 'service.name', 'unknown-service');
        this.servicePort = get(configuration, 'service.port');
        this.serviceHost = get(configuration, 'service.host');

        this.tries = 0;
        this.maxRetry = get(configuration, 'consul.maxRetry', 10);
        this.retryInterval = get(configuration, 'consul.retryInterval', 1000);

    }

    public async onModuleInit(): Promise<any> {
        return this.register();
    }

    public async onModuleDestroy(): Promise<any> {
        return await this.unregister();
    }

    private async register(): Promise<void> {
        const service = this.getServiceInfo();

        try {
            await this.consul.agent.service
              .register(service);

            this.logger.log('Register the service success.');
            this.resetTriesCount();
        }
        catch (e) {
            if (this.tries > this.maxRetry) {
                this.logger.error(`Maximum connection retry reached. Exiting.`);
                process.exit(1);
            }

            this.logger.warn(`Registering the service ${this.serviceName} failed.\n ${e} \n Retrying in ${this.retryInterval}`);
            this.tries++;

            setTimeout(() => this.register(), this.retryInterval);
        }
    }

    private async unregister(): Promise<void> {
        const service = this.getServiceInfo();

        try {
            await this.consul.agent.service
              .deregister(service);

            this.logger.log(`Unregistered the service ${service.name} successfully.`);
            this.resetTriesCount();
        }
        catch (e) {
            if (this.tries > this.maxRetry) {
                this.logger.error('Deregister the service fail.', e);
            }

            this.logger.warn(`Deregister the service fail, will retry after ${this.retryInterval}`);
            this.tries++;

            setTimeout(() => this.register(), this.retryInterval);
        }
    }

    private getServiceInfo(): any {
        return {
            id: this.serviceId,
            name: this.serviceName,
            address: this.serviceHost,
            port: this.servicePort,
        };
    }

    private resetTriesCount(): void {
        this.tries = 0;
    }
}
