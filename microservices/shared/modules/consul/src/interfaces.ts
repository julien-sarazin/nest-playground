import * as Consul from 'consul';
import ConsulOptions = Consul.ConsulOptions;
import RegisterOptions = Consul.Agent.Service.RegisterOptions;
import RegisterCheck = Consul.Agent.Service.RegisterCheck;
import { AxiosRequestConfig } from 'axios';
import { ServiceNode } from './classes/ServiceNode';

export interface ServiceNodeConfiguration {
    id: string;
    service: string;
    tags: string[];
    address: string;
    meta?: any
    port?: number,
}

export interface CollaboratorOptions extends RegisterOptions {
}

export interface ConsulServiceCheckOptions extends RegisterCheck {
    DeregisterCriticalServiceAfter: string;
}

export interface ConsulClientOptions extends ConsulOptions {
    maxRetry?: number;
    retryInterval?: number;
}

export interface ConsulServiceOptions extends RegisterOptions {
    id: string;
    meta?: any;
    protocol?: string;
    check?: ConsulServiceCheckOptions;
    checks?: ConsulServiceCheckOptions[];
}

export interface ConsulModuleConfiguration {
    consul: ConsulClientOptions;
    service?: ConsulServiceOptions;
    collaborators?: CollaboratorOptions[];
}

export interface IResourceConfiguration extends AxiosRequestConfig {
    path: string;
    mapper?(source: any, target: any): void;
}

export interface IServiceNodeWatcherDelegate {
    onNodesDidChange(nodes: ServiceNode[]): void;
}

export interface IRemoteRepository<T> {
    setConfiguration(defaultConfiguration: IResourceConfiguration): void;

    list(configuration?: IResourceConfiguration): Promise<T[]>;

    peek(data?: any, configuration?: IResourceConfiguration): Promise<T | null>;

    create(data?: any, configuration?: IResourceConfiguration): Promise<T>;

    update(data?: any, configuration?: IResourceConfiguration): Promise<T>;

    remove(configuration?: IResourceConfiguration): Promise<void>;

    raw(extra: IResourceConfiguration): Promise<any>;
}
