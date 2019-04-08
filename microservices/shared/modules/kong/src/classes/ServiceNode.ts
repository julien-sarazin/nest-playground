import { ServiceNodeConfiguration } from '../interfaces';
import { AxiosRequestConfig } from 'axios';
import { Kong } from './KongClient';

export class ServiceNode {
    constructor(
        private readonly kongClient: Kong,
        private readonly servicePath: string,
    ) {
    }

    public async request(configuration: AxiosRequestConfig): Promise<any> {
        configuration.url
    }
}
