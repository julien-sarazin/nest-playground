import { ServiceConfiguration } from '../interfaces/service-configuration.interface';
import { AxiosRequestConfig } from 'axios';
export declare class RemoteService {
    private readonly protocol;
    private readonly port;
    private readonly basePath;
    constructor(configuration: ServiceConfiguration);
    get(resourcePath: string, configuration?: AxiosRequestConfig): Promise<any>;
    post(resourcePath: string, data?: any, configuration?: AxiosRequestConfig): Promise<any>;
    put(resourcePath: string, data?: any, configuration?: AxiosRequestConfig): Promise<any>;
    delete(resourcePath: string, configuration?: AxiosRequestConfig): Promise<any>;
}
