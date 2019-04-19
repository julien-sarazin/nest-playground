import { Inject, Injectable, Logger, LoggerService, OnModuleDestroy, OnModuleInit, Optional } from '@nestjs/common';
import { get } from 'lodash';
import { KongModuleConfiguration, KongTarget } from './interfaces';
import { Kong } from './classes/KongClient';
import { KONG_CLIENT_PROVIDER } from './constants';
import { KongConsumersResource } from './classes/consumers.resource';

export interface Instantiable<T> {
    new(): T;
}

@Injectable()
export class NestKongService implements OnModuleInit, OnModuleDestroy {
    private localService: KongTarget;
    private tries: number;
    private readonly maxRetry: number;
    private readonly retryInterval: number;

    public readonly consumers: KongConsumersResource;

    constructor(
        @Inject(KONG_CLIENT_PROVIDER) private readonly kongClient: Kong,
        private readonly configuration: KongModuleConfiguration,
        @Optional() private readonly logger?: LoggerService,
    ) {
        this.localService = configuration.service;
        this.logger = this.logger || new Logger(NestKongService.name);
        /**
         * Common service information
         */
        this.localService = configuration.service;
        /**
         * Kong fail checks
         */
        this.tries = 0;
        this.maxRetry = get(configuration, 'kong.maxRetry', 10);
        this.retryInterval = get(configuration, 'kong.retryInterval', 1000);

        this.setupProcessHandlers();
        this.consumers = new KongConsumersResource(this.kongClient);
    }

    public async onModuleInit(): Promise<any> {
        if (!this.localService) {
            return;
        }

        return await this.register();
    }

    public async onModuleDestroy(): Promise<any> {
        if (!this.localService) {
            return;
        }

        return await this.unregister();
    }

    private async register(): Promise<void> {
        this.logger.log(`Registering service to ${this.localService.upstream} ...`, NestKongService.name);
        try {
            this.localService = await this.kongClient.register(this.localService);

            this.logger.log(`Registration succeeded.`, NestKongService.name);
            this.resetTriesCount();
        }
        catch (e) {
            if (this.tries > this.maxRetry) {
                this.logger.error(`> Maximum connection retry reached. Exiting.`);
                process.exit(1);
            }

            this.logger.warn(`Registering the service to ${this.localService.upstream} failed.\n ${e} \n Retrying in ${this.retryInterval}`);
            this.tries++;

            setTimeout(() => this.register(), this.retryInterval);
        }
    }

    private async unregister(): Promise<void> {
        try {
            await this.kongClient
                .unregister(this.localService);

            this.logger.log(`Unregistered the service ${this.localService.upstream} successfully.`);
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

    private setupProcessHandlers(): void {
        /**
         * Process terminated manually.
         */
        process.on('SIGINT', async () => {
            await this.unregister();
            process.exit(0);
        });
        /**
         * Process terminated during its lifecycle.
         */
        process.on('exit', async () => {
            await this.unregister();
            process.exit(0);
        });
    }

    private resetTriesCount(): void {
        this.tries = 0;
    }
}
