import { ServiceNode } from './classes/ServiceNode';
import { Instantiable } from './nest-consul.service';
import { AxiosRequestConfig } from 'axios';
import { IServiceNodeWatcherDelegate } from './interfaces';
export declare class RemoteRepositoryService<R> implements IServiceNodeWatcherDelegate {
    private ResourceType;
    private index;
    private readonly resourceName;
    private nodes;
    constructor(ResourceType: Instantiable<R>, index?: number, resourceName?: string);
    private readonly node;
    create(data?: any, config?: AxiosRequestConfig): Promise<R>;
    list(config?: AxiosRequestConfig): Promise<R[]>;
    pick(config?: AxiosRequestConfig): Promise<R | null>;
    raw(config?: AxiosRequestConfig): Promise<any>;
    remove(config?: AxiosRequestConfig): Promise<void>;
    update(data?: any, config?: AxiosRequestConfig): Promise<R>;
    onNodesDidChange(nodes: ServiceNode[]): void;
}
