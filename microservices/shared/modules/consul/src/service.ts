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
    private readonly serviceTags: string[];
    private readonly serviceMeta: any;

    private readonly check: any;

    private tries: number;
    private readonly maxRetry: number;
    private readonly retryInterval: number;

    constructor(
      @Inject(CONSUL_CLIENT_PROVIDER) private readonly consul: Consul.Consul,
      @Inject(CONSUL_CONFIGURATION_PROVIDER) private readonly configuration: any,
      ) {
        this.logger = new Logger();
        /**
         * Common service information
         */
        this.serviceId = get(configuration, 'service.id', uuid.v4());
        this.serviceName = get(configuration, 'service.name', 'unknown-service');
        this.servicePort = get(configuration, 'service.port');
        this.serviceHost = get(configuration, 'service.host');
        this.serviceTags = get(configuration, 'service.tags');
        this.serviceMeta = get(configuration, 'service.meta');
        /**
         * Health check settings
         */
        this.check = get(configuration, 'service.check');
        /**
         * Consul fail checks
         */
        this.tries = 0;
        this.maxRetry = get(configuration, 'consul.maxRetry', 10);
        this.retryInterval = get(configuration, 'consul.retryInterval', 1000);
    }

    public async onModuleInit(): Promise<any> {
        this.logger.log('Initializing module...');
        return this.register();
    }

    public async onModuleDestroy(): Promise<any> {
        this.logger.log('Destroying module...');
        return await this.unregister();
    }

    private async register(): Promise<void> {
        const service = this.getServiceInfo();
        console.log('service', service);
        try {
            await this.consul.agent.service
              .register(service);

            console.log('Register the service success.');
            this.resetTriesCount();
        }
        catch (e) {
            if (this.tries > this.maxRetry) {
                console.error(`Maximum connection retry reached. Exiting.`);
                process.exit(1);
            }

            console.warn(`Registering the service ${this.serviceName} failed.\n ${e} \n Retrying in ${this.retryInterval}`);
            this.tries++;

            setTimeout(() => this.register(), this.retryInterval);
        }
    }

    private async unregister(): Promise<void> {
        const service = this.getServiceInfo();

        try {
            await this.consul.agent.service
              .deregister(service);

            console.log(`Unregistered the service ${service.name} successfully.`);
            this.resetTriesCount();
        }
        catch (e) {
            if (this.tries > this.maxRetry) {
                this.logger.error('Deregister the service fail.', e);
            }

            console.warn(`Deregister the service fail, will retry after ${this.retryInterval}`);
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
            tags: this.serviceTags,
            meta: this.serviceMeta,
            check: this.check
        };
    }

    private resetTriesCount(): void {
        this.tries = 0;
    }

}
