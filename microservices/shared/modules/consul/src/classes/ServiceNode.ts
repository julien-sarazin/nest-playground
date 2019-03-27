import { ServiceNodeConfiguration } from '../interfaces';
import * as _ from 'lodash';
import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class ServiceNode {
    public readonly id: string;
    public readonly service: string;
    public readonly host: string;
    public readonly port: number;
    public readonly meta: any;
    private readonly axios: AxiosInstance;

    constructor(configuration: ServiceNodeConfiguration) {
        /**
         * Vicious trick when the configuration comes from Consul response which use
         * capitalized properties.
         *
         * TODO: Remove this piece of shit.
         */
        configuration = _.mapKeys(configuration, (v, k) => k.toLowerCase()) as ServiceNodeConfiguration;

        console.log('[DEBUG] Service node configuration:' + JSON.stringify(configuration, null, 4), ServiceNode.name);

        this.id = configuration.id;
        this.service = configuration.service;
        this.meta = configuration.meta;
        this.host = configuration.address;
        this.port = configuration.port;

        this.axios = Axios.create({ baseURL: `http://${this.host}${this.port !== 80 ? `:${this.port}` : ''}/api` });
    }

    public async request(configuration: AxiosRequestConfig) {
        return await this.axios
            .request(configuration);
    }

}
