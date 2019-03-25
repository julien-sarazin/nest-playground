import { Injectable, Logger, LoggerService, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import * as Consul from "consul";
import { get } from "lodash";
import { ServiceConfiguration } from "./interfaces/service-configuration.interface";
import { ConsulCriteria } from "./interfaces/consul-criteria.interface";
import { RemoteService } from "./classes/RemoteService";
import uuid = require("uuid");

@Injectable()
export class ConsulService implements OnModuleInit, OnModuleDestroy {
    private tries: number;
    private readonly maxRetry: number;
    private readonly retryInterval: number;

    public readonly localService: ServiceConfiguration;
    public readonly remoteServices: ServiceConfiguration[];

    constructor(
      private readonly consul: Consul.Consul,
      private readonly configuration: any,
      private readonly logger?: LoggerService
    ) {
        this.logger = this.logger || new Logger();
        /**
         * Common service information
         */
        this.localService = configuration.service;
        this.localService.id = this.localService.id || uuid.v4();
        /**
         * Consul fail checks
         */
        this.tries = 0;
        this.maxRetry = get(configuration, "consul.maxRetry", 10);
        this.retryInterval = get(configuration, "consul.retryInterval", 1000);
        /**
         * Setup watchers
         */
        this.setupListeners();
    }

    public get(service: string): RemoteService {
        return new RemoteService(this.consul, service);
    }

    public async onModuleInit(): Promise<any> {
        this.logger.log("Initializing module...");
        return this.register();
    }

    public async onModuleDestroy(): Promise<any> {
        this.logger.log("Destroying module...");
        return await this.unregister();
    }

    private async register(): Promise<void> {
        this.logger.log(`> Registering ${this.localService.name} ...`);
        try {
            await this.consul.agent.service
              .register(this.localService);

            this.logger.log(`> Registered the service ${this.localService.name} successfully.`);
            this.resetTriesCount();
        } catch (e) {
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
        } catch (e) {
            if (this.tries > this.maxRetry) {
                this.logger.error("Deregister the service fail.", e);
            }

            this.logger.warn(`Deregister the service fail, will retry after ${this.retryInterval}`);
            this.tries++;

            setTimeout(() => this.register(), this.retryInterval);
        }
    }

    private resetTriesCount(): void {
        this.tries = 0;
    }

    private setupListeners(): void {
        process.on('SIGINT', async () => {
            await this.unregister();
            process.exit(0);
        });

        process.on('exit', async () => {
            await this.unregister();
            process.exit(0);
        });


    }
}
