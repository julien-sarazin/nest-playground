import { ServiceConfiguration } from '../interfaces/service-configuration.interface';
import Axios, { AxiosRequestConfig } from 'axios';
import * as path from 'path';

export class RemoteService {
    private readonly protocol: string;
    private readonly port: number;
    private readonly basePath: string;

    constructor(configuration: ServiceConfiguration) {
        this.protocol = configuration.protocol || 'http://';
        this.port = configuration.port;
        this.basePath = configuration.meta.basePath;
    }

    public async get(resourcePath: string, configuration?: AxiosRequestConfig): Promise<any> {
        const uri = path.join(this.protocol, this.basePath, resourcePath);

        return await Axios
          .get(uri, configuration);
    }

    public async post(resourcePath: string, data?: any, configuration?: AxiosRequestConfig): Promise<any> {
        const uri = path.join(this.protocol, this.basePath, resourcePath);

        return await Axios
          .post(uri, data, configuration);
    }

    public async put(resourcePath: string, data?: any, configuration?: AxiosRequestConfig): Promise<any> {
        const uri = path.join(this.protocol, this.basePath, resourcePath);

        return await Axios
          .put(uri, data, configuration);
    }

    public async delete(resourcePath: string, configuration?: AxiosRequestConfig): Promise<any> {
        const uri = path.join(this.protocol, this.basePath, resourcePath);

        return await Axios
          .delete(uri, configuration);
    }
}
