import Axios from "axios";
import * as _ from "lodash";
import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import * as path from "path";
import { IResourceConfiguration, IServiceNodeWatcherDelegate } from "./interfaces";
import { ServiceNode } from "./classes/ServiceNode";
import { Instantiable } from "./nest-consul.service";

@Injectable()
export class RemoteRepositoryService<R> implements IServiceNodeWatcherDelegate {
    private defaultConfiguration: IResourceConfiguration;
    private nodes: ServiceNode[];

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

    constructor(
      private ResourceType: Instantiable<R>,
      private index: number = 0,
      private readonly resourceName: string = ResourceType.name.toLocaleLowerCase(),
    ) {
        this.defaultConfiguration = { path: '/' + this.resourceName };
    }

    public setNodes(nodes: ServiceNode[]) {
        this.nodes = nodes;
    }

    /**
     *
     * @param defaultConfiguration
     */
    public setConfiguration(defaultConfiguration: IResourceConfiguration): void {
        this.defaultConfiguration = defaultConfiguration;
    }

    /**
     *
     * @param data
     * @param extra
     */
    public async create(data?: any, extra?: IResourceConfiguration): Promise<R> {
        const configuration = _.assignIn({}, this.defaultConfiguration, extra);
        const node = this.node;

        const uri = path.join(node.address, configuration.path);

        return await Axios
          .post(uri, data, configuration)
          .then(response => _.assign(new this.ResourceType(), response.data));
    }

    /**
     *
     * @param extra
     */
    public async list(extra?: IResourceConfiguration): Promise<R[]> {
        const configuration = _.assignIn({}, this.defaultConfiguration, extra);
        const node = this.node;

        const uri = path.join(node.address, configuration.path);

        return await Axios
          .get(uri, configuration)
          .then(response => _.assign(new this.ResourceType(), response.data));
    }

    /**
     *
     * @param extra
     */
    public async peek(extra?: IResourceConfiguration): Promise<R | null> {
        const configuration = _.assignIn({}, this.defaultConfiguration, extra);
        const node = this.node;

        const uri = path.join(node.address, configuration.path);

        return await Axios
          .get(uri, configuration)
          .then(response => _.assign(new this.ResourceType(), response.data));
    }

    /**
     *
     * @param extra
     */
    public async raw(extra: IResourceConfiguration): Promise<any> {
        const configuration = _.assignIn({}, this.defaultConfiguration, extra);
        const node = this.node;

        extra.url = path.join(node.address, configuration.path);

        return await Axios
          .request(configuration)
          .then(response => _.assign(new this.ResourceType(), response.data));
    }

    /**
     *
     * @param extra
     */
    public async remove(extra?: IResourceConfiguration): Promise<void> {
        const configuration = _.assignIn({}, this.defaultConfiguration, extra);
        const node = this.node;

        const uri = path.join(node.address, configuration.path);

        return await Axios
          .delete(uri, configuration)
          .then(response => _.assign(new this.ResourceType(), response.data));
    }

    /**
     *
     * @param data
     * @param extra
     */
    public async update(data?: any, extra?: IResourceConfiguration): Promise<R> {
        const configuration = _.assignIn({}, this.defaultConfiguration, extra);
        const node = this.node;

        const uri = path.join(node.address, configuration.path);

        return await Axios
          .put(uri, data, configuration)
          .then(response => _.assign(new this.ResourceType(), response.data));
    }

    /**
     * Updated information regarding the current repository datasource
     * @param nodes new list of nodes
     */
    public onNodesDidChange(nodes: ServiceNode[]): void {
        this.nodes = nodes;
    }
}
