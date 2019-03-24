import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as Consul from 'consul';
export declare class ConsulService implements OnModuleInit, OnModuleDestroy {
    private readonly consul;
    private readonly configuration;
    private logger;
    private readonly serviceId;
    private readonly serviceName;
    private readonly servicePort;
    private readonly serviceHost;
    private readonly serviceTags;
    private readonly serviceMeta;
    private readonly check;
    private tries;
    private readonly maxRetry;
    private readonly retryInterval;
    constructor(consul: Consul.Consul, configuration: any);
    onModuleInit(): Promise<any>;
    onModuleDestroy(): Promise<any>;
    private register;
    private unregister;
    private getServiceInfo;
    private resetTriesCount;
}
