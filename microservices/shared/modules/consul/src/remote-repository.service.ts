import Axios from 'axios';
import * as _ from 'lodash';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import * as path from 'path';
import { IRemoteRepository, IResourceConfiguration, IServiceWatcherDelegate } from './interfaces';
import { ServiceNode } from './classes/ServiceNode';

@Injectable()
export class RemoteRepositoryService<T> implements IRemoteRepository<T>, IServiceWatcherDelegate {
    private defaultConfiguration: IResourceConfiguration;
    private nodes: ServiceNode[];
    private index: number;

    private get node(): ServiceNode {
        if (this.nodes.length === 0) {
            throw new ServiceUnavailableException();
        }

        const loop = (this.index++) % this.nodes.length;
        const configuration = this.nodes[loop];

        return new ServiceNode(configuration);
    }

    constructor(private ResourceType: new () => T) {
        this.index = 0;
        this.defaultConfiguration.path = ResourceType.name.toLocaleLowerCase();
    }

    public setConfiguration(defaultConfiguration: IResourceConfiguration): void {
        this.defaultConfiguration = defaultConfiguration;
    }

    public async create(data?: any, extra?: IResourceConfiguration): Promise<T> {
        const configuration = _.assignIn({}, this.defaultConfiguration, extra);
        const node = this.node;

        const uri = path.join(node.address, configuration.path);

        return await Axios
          .post(uri, data, configuration)
          .then(response => _.assign(new this.ResourceType(), response.data));
    }

    public async list(extra?: IResourceConfiguration): Promise<T[]> {
        const configuration = _.assignIn({}, this.defaultConfiguration, extra);
        const node = this.node;

        const uri = path.join(node.address, configuration.path);

        return await Axios
          .get(uri, configuration)
          .then(response => _.assign(new this.ResourceType(), response.data));
    }

    public async peek(data?: any, extra?: IResourceConfiguration): Promise<T | null> {
        const configuration = _.assignIn({}, this.defaultConfiguration, extra);
        const node = this.node;

        const uri = path.join(node.address, configuration.path);

        return await Axios
          .get(uri, configuration)
          .then(response => _.assign(new this.ResourceType(), response.data));
    }

    public async raw(extra: IResourceConfiguration): Promise<any> {
        const configuration = _.assignIn({}, this.defaultConfiguration, extra);
        const node = this.node;

        extra.url = path.join(node.address, configuration.path);

        return await Axios
          .request(configuration)
          .then(response => _.assign(new this.ResourceType(), response.data));
    }

    public async remove(extra?: IResourceConfiguration): Promise<void> {
        const configuration = _.assignIn({}, this.defaultConfiguration, extra);
        const node = this.node;

        const uri = path.join(node.address, configuration.path);

        return await Axios
          .delete(uri, configuration)
          .then(response => _.assign(new this.ResourceType(), response.data));
    }

    public async update(data?: any, extra?: IResourceConfiguration): Promise<T> {
        const configuration = _.assignIn({}, this.defaultConfiguration, extra);
        const node = this.node;

        const uri = path.join(node.address, configuration.path);

        return await Axios
          .put(uri, configuration)
          .then(response => _.assign(new this.ResourceType(), response.data));
    }

    /**
     * Add a node matching the service attached to the resource.
     */
    onServiceDidRegister(service: ServiceNode): void {
        if (service.name !== this.defaultConfiguration.path) {
            return;
        }

        this.nodes.push(service);
    }

    /**
     * Updated information regarding the current repository datasource
     * @param service
     */
    onServiceDidUpdate(service: ServiceNode): void {
        if (service.name !== this.defaultConfiguration.path) {
            return;
        }

        const node = this.nodes.find(n => n.id === service.id);
        if (!node) {
            this.nodes.push(node);
        }
        else {
            _.assign(node, service);
        }
    }

    /**
     * Unregister the service from the current repository datasource
     * @param service
     */
    onServiceDidUnregister(service: ServiceNode): void {
        if (service.name !== this.defaultConfiguration.path) {
            return;
        }

        let index;
        this.nodes.some((n, i) => {
            if (n.id === service.id) {
                index = i;
                return true;
            }
        });

        if (index !== undefined) {
            this.nodes.splice(index, 1);
        }
    }
}
