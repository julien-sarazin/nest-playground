import { Injectable, Logger, LoggerService, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as Consul from 'consul';
import { get } from 'lodash';
import {
    ConsulModuleConfiguration,
    ConsulServiceOptions,
    IRemoteRepository,
    IServiceWatcherDelegate
} from "./interfaces";
import uuid = require('uuid');
import { RemoteRepositoryService } from "./remote-repository.service";

@Injectable()
export class NestConsulService implements OnModuleInit, OnModuleDestroy {
    private tries: number;
    private readonly maxRetry: number;
    private readonly retryInterval: number;

    public readonly localService: ConsulServiceOptions;
    public readonly delegates: Map<string, IServiceWatcherDelegate[]>;

    constructor(
      private readonly consul: Consul.Consul,
      private readonly configuration: ConsulModuleConfiguration,
      private readonly logger?: LoggerService,
    ) {
        this.logger = this.logger || new Logger();
        this.delegates = new Map();

        /**
         * Common service information
         */
        this.localService = configuration.service;
        this.localService.id = this.localService.id || uuid.v4();
        /**
         * Consul fail checks
         */
        this.tries = 0;
        this.maxRetry = get(configuration, 'consul.maxRetry', 10);
        this.retryInterval = get(configuration, 'consul.retryInterval', 1000);
        /**
         * Setup Event Listeners
         */
        this.setupProcessHandlers();
    }

    public getRemoteRepository<R>(ResourceType: new () => R): IRemoteRepository<R> {
        const repository = new RemoteRepositoryService(ResourceType);
        const resourceName = ResourceType.name.toLocaleLowerCase();

        const delegates = this.delegates.get(resourceName);

        if (!delegates) {
            this.watch(resourceName);
            this.delegates.set(resourceName, [repository]);
        }
        else {
            delegates.push(repository);
        }

        return repository;
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
        this.logger.log(`> Registering service ${this.localService.name} ...`);
        try {
            await this.consul.agent.service
              .register(this.localService);

            this.logger.log(`> Registration succeeded.`);
            this.resetTriesCount();
        }
        catch (e) {
            if (this.tries > this.maxRetry) {
                this.logger.error(`> Maximum connection retry reached. Exiting.`);
                process.exit(1);
            }

            this.logger.warn(`Registering the service ${this.localService.name} failed.\n ${e} \n Retrying in ${this.retryInterval}`);
            this.tries++;

            setTimeout(() => this.register(), this.retryInterval);
        }
    }

    private async unregister(): Promise<void> {
        try {
            await this.consul.agent.service
              .deregister(this.localService);

            this.logger.log(`Unregistered the service ${this.localService.name} successfully.`);
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

    private resetTriesCount(): void {
        this.tries = 0;
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

    private watch(resourceName: string): void {
        const options: any = {
            service: resourceName,
            passing: true,
        };

        const watch = this.consul.watch({
            method: this.consul.health.service,
            options,
        });
        watch.on('change', (changes, res) => changes.forEach(notifyDelegates.bind(this)));
        watch.on('error', err => this.logger.error('error:' + err));

        // Why?
        setTimeout(() => watch.end(), 30 * 1000);

        function notifyDelegates(change) {

        }
    }
}
