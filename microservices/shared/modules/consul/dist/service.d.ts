import { LoggerService, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import * as Consul from "consul";
import { ServiceConfiguration } from "./interfaces/service-configuration.interface";
import { ConsulCriteria } from "./interfaces/consul-criteria.interface";
import { RemoteService } from "./classes/RemoteService";
export declare class ConsulService implements OnModuleInit, OnModuleDestroy {
    private readonly consul;
    private readonly configuration;
    private readonly logger?;
    private tries;
    private readonly maxRetry;
    private readonly retryInterval;
    readonly localService: ServiceConfiguration;
    readonly remoteServices: ServiceConfiguration[];
    constructor(consul: Consul.Consul, configuration: any, logger?: LoggerService);
    next(c: ConsulCriteria | string): RemoteService;
    onModuleInit(): Promise<any>;
    onModuleDestroy(): Promise<any>;
    private register;
    private unregister;
    private resetTriesCount;
    private setupWatchers;
}
