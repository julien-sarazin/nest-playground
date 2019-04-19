import * as _ from 'lodash';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ServiceNode } from './classes/ServiceNode';
import { Instantiable } from './nest-consul.service';
import { AxiosRequestConfig } from 'axios';
import { IServiceNodeWatcherDelegate } from './interfaces';

@Injectable()
export class RemoteRepositoryService<R> implements IServiceNodeWatcherDelegate {
    private nodes: ServiceNode[];

    constructor(
        private ResourceType: Instantiable<R>,
        private index: number = 0,
        private readonly resourceName: string = ResourceType.name.toLocaleLowerCase(),
    ) {
    }

    /**
     * Computed properties
     */
    private get node(): ServiceNode {
        if (this.nodes.length === 0) {
            throw new ServiceUnavailableException();
        }

        const loop = (this.index++) % this.nodes.length;
        return this.nodes[loop];
    }

    public async create(data?: any, config?: AxiosRequestConfig): Promise<R> {
        const configuration = _.assignIn({ method: 'POST', url: this.resourceName, data }, config);

        return await this.node
            .request(configuration)
            .then(response => _.assign(new this.ResourceType(), response.data));
    }

    public async list(config?: AxiosRequestConfig): Promise<R[]> {
        const configuration = _.assignIn({ method: 'GET', url: this.resourceName }, config);

        return await this.node
            .request(configuration)
            .then(response => response.data.map(data => _.assign(new this.ResourceType(), data)));
    }

    public async pick(config?: AxiosRequestConfig): Promise<R | null> {
        const configuration = _.assignIn({ method: 'GET', url: this.resourceName + '/search' }, config);

        return await this.node
            .request(configuration)
            .then(response => _.assign(new this.ResourceType(), response.data));
    }

    public async raw(config?: AxiosRequestConfig): Promise<any> {
        const configuration = _.assignIn({}, config);

        // TODO: Do something with the response.data
        return await this.node
            .request(configuration)
            .then(response => response.data);
    }

    public async remove(config?: AxiosRequestConfig): Promise<void> {
        const configuration = _.assignIn({ method: 'DELETE', url: this.resourceName }, config);

        await this.node
            .request(configuration);
    }

    public async update(data?: any, config?: AxiosRequestConfig): Promise<R> {
        const configuration = _.assignIn({ method: 'PUT', url: this.resourceName, data }, config);

        return await this.node
            .request(configuration)
            .then(response => _.assign(new this.ResourceType(), response.data));
    }

    onNodesDidChange(nodes: ServiceNode[]): void {
        this.nodes = nodes;
    }
}
