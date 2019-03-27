import { Injectable, Logger, LoggerService, OnModuleDestroy, OnModuleInit, Optional } from "@nestjs/common";
import * as Consul from "consul";
import { get } from "lodash";
import { ConsulModuleConfiguration, ConsulServiceOptions } from "./interfaces";
import { RemoteRepositoryService } from "./remote-repository.service";
import { ServiceNode } from "./classes/ServiceNode";
import uuid = require("uuid");

export interface Instantiable<T> {
    new(): T;
}

@Injectable()
export class NestConsulService implements OnModuleInit, OnModuleDestroy {
    private tries: number;
    private collaborators: Map<string, ServiceNode[]>;
    private readonly maxRetry: number;
    private readonly retryInterval: number;

    public readonly localService: ConsulServiceOptions;

    constructor(
      private readonly consul: Consul.Consul,
      private readonly configuration: ConsulModuleConfiguration,
      @Optional() private readonly logger?: LoggerService
    ) {
        this.collaborators = new Map<string, ServiceNode[]>();
        this.logger = this.logger || new Logger(NestConsulService.name);
        /**
         * Common service information
         */
        this.localService = configuration.service;
        console.log('> configuration.service:', configuration.service);
        this.localService.id = this.localService.id || uuid.v4();
        /**
         * Consul fail checks
         */
        this.tries = 0;
        this.maxRetry = get(configuration, "consul.maxRetry", 10);
        this.retryInterval = get(configuration, "consul.retryInterval", 1000);
    }

    public async onModuleInit(): Promise<any> {
        this.logger.log("Initializing module...");

        await this.register();
        await this.discover();
        await this.setupProcessHandlers();
    }

    public async onModuleDestroy(): Promise<any> {
        this.logger.log("Destroying module...", NestConsulService.name);
        return await this.unregister();
    }

    public getRemoteRepository<R>(Type: Instantiable<R>, service: string): RemoteRepositoryService<R> {
        this.logger.log("Providing remote repository for service:" + Type.name.toLocaleLowerCase(), NestConsulService.name);

        const collaborators = this.collaborators.get(service);
        if (!collaborators) {
            throw new ServiceUnavailableError();
        }

        const repository = new RemoteRepositoryService(Type);
        repository.setNodes(collaborators);

        return repository;
    }

    private async register(): Promise<void> {
        this.logger.log(`Registering service ${this.localService} ...`, NestConsulService.name);
        try {
            await this.consul.agent.service
              .register(this.localService);

            this.logger.log(`Registration succeeded.`, NestConsulService.name);
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

    private async discover() {
        const self = this;

        return Promise
          .all(self.configuration.collaborators.map(collaborator => fetch(collaborator.name).then(watch)));

        async function fetch(serviceName: string) {
            self.logger.log(`Fetching health for ${serviceName}.service`, NestConsulService.name);

            const options = { service: serviceName };
            const healthData: [any] = await self.consul.health.service(options);

            self.collaborators
              .set(serviceName, healthData.map(data => new ServiceNode(data.Service)));

            self.logger.log("[DEBUG] collaborators:" + JSON.stringify(self.collaborators.entries(), null, 4), NestConsulService.name);
            return serviceName;
        }

        async function watch(serviceName: string) {
            self.logger.log(`Watching service ${serviceName}`, NestConsulService.name);

            const options: any = {
                service: serviceName,
                passing: true
            };

            const watch = self.consul
              .watch({ method: self.consul.health.service, options });

            watch.on("change", (changes, res) => {
                self.collaborators
                  .set(serviceName, changes.map(data => new ServiceNode(data.Service)));

                self.logger.log("[DEBUG] collaborators:" + JSON.stringify(self.collaborators.get(serviceName), null, 4), NestConsulService.name);
            });

            watch.on("error", err => self.logger.error("error:" + err));
        }
    }

    private setupProcessHandlers(): void {
        /**
         * Process terminated manually.
         */
        process.on("SIGINT", async () => {
            await this.unregister();
            process.exit(0);
        });
        /**
         * Process terminated during its lifecycle.
         */
        process.on("exit", async () => {
            await this.unregister();
            process.exit(0);
        });
    }

    private resetTriesCount(): void {
        this.tries = 0;
    }
}

export class ServiceUnavailableError extends Error {
}
