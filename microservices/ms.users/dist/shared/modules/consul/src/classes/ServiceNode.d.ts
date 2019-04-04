import { ServiceNodeConfiguration } from '../interfaces';
import { AxiosRequestConfig } from 'axios';
export declare class ServiceNode {
    readonly id: string;
    readonly service: string;
    readonly host: string;
    readonly port: number;
    readonly meta: any;
    private readonly axios;
    constructor(configuration: ServiceNodeConfiguration);
    request(configuration: AxiosRequestConfig): Promise<any>;
}
