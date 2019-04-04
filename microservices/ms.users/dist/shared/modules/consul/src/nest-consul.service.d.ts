import { LoggerService, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as Consul from 'consul';
import { ConsulModuleConfiguration, ConsulServiceOptions, IServiceNodeWatcherDelegate } from './interfaces';
import { RemoteRepositoryService } from './remote-repository.service';
export interface Instantiable<T> {
    new (): T;
}
export declare class NestConsulService implements OnModuleInit, OnModuleDestroy {
    private readonly consul;
    private readonly configuration;
    private readonly logger?;
    readonly localService: ConsulServiceOptions;
    private tries;
    private collaborators;
    private readonly maxRetry;
    private readonly retryInterval;
    constructor(consul: Consul.Consul, configuration: ConsulModuleConfiguration, logger?: LoggerService);
    onModuleInit(): Promise<any>;
    onModuleDestroy(): Promise<any>;
    getRemoteRepository<R>(Type: Instantiable<R>, service: string): RemoteRepositoryService<R>;
    addServiceListener(service: string, listener: IServiceNodeWatcherDelegate): void;
    private register;
    private unregister;
    private discover;
    private setupProcessHandlers;
    private resetTriesCount;
}
export declare class ServiceUnavailableError extends Error {
}
