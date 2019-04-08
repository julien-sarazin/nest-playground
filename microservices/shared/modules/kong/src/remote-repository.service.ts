import * as _ from 'lodash';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { KONG_CLIENT_PROVIDER } from './constants';
import { Kong } from './classes/KongClient';
import * as path from 'path';
import { Instantiable } from './nest-kong.service';

@Injectable()
export class RemoteRepositoryService<R> {

    constructor(
        private ResourceType: Instantiable<R>,
        private readonly serviceName: string,
        private readonly resourceName: string = ResourceType.constructor.name.toLowerCase(),
        private readonly resourceUrl: string = path.join(serviceName, resourceName),
        @Inject(KONG_CLIENT_PROVIDER) private readonly kongClient: Kong,
    ) {
    }

    public async create(data?: any, config?: AxiosRequestConfig): Promise<R> {
        const configuration = _.assignIn({ method: 'POST', url: this.resourceUrl, data }, config);

        return await this.kongClient
            .request(configuration)
            .then(response => _.assign(new this.ResourceType(), response.data));
    }

    public async list(config?: AxiosRequestConfig): Promise<R[]> {
        const configuration = _.assignIn({ method: 'GET', url: this.resourceUrl }, config);

        return await this.kongClient
            .request(configuration)
            .then(response => response.data.map(data => _.assign(new this.ResourceType(), data)));
    }

    public async pick(config?: AxiosRequestConfig): Promise<R | null> {
        const configuration = _.assignIn({ method: 'GET', url: this.resourceUrl }, config);

        return await this.kongClient
            .request(configuration)
            .then(response => _.assign(new this.ResourceType(), response.data));
    }

    public async raw(config?: AxiosRequestConfig): Promise<any> {
        const configuration = _.assignIn({}, config);

        // TODO: Do something with the response.data
        return await this.kongClient
            .request(configuration)
            .then(response => response.data);
    }

    public async remove(config?: AxiosRequestConfig): Promise<void> {
        const configuration = _.assignIn({ method: 'DELETE', url: this.resourceUrl }, config);

        await this.kongClient
            .request(configuration);
    }

    public async update(data?: any, config?: AxiosRequestConfig): Promise<R> {
        const configuration = _.assignIn({ method: 'PUT', url: this.resourceUrl, data }, config);

        return await this.kongClient
            .request(configuration)
            .then(response => _.assign(new this.ResourceType(), response.data));
    }
}
