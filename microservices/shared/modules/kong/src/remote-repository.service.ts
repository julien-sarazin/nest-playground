import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { Instantiable } from './nest-consul.service';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class RemoteRepositoryService<R> {

    constructor(
        private ResourceType: Instantiable<R>,
        private readonly service: string,
    ) {
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
        const configuration = _.assignIn({ method: 'GET', url: this.resourceName + '/peek' }, config);

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
}
