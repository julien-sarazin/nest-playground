import * as Consul from 'consul';
import ConsulOptions = Consul.ConsulOptions;
import RegisterOptions = Consul.Agent.Service.RegisterOptions;
import RegisterCheck = Consul.Agent.Service.RegisterCheck;
import { AxiosRequestConfig } from "axios";
export interface ConsulServiceCheckOptions extends RegisterCheck {
    DeregisterCriticalServiceAfter: string;
}
export interface ConsulClientOptions extends ConsulOptions {
    maxRetry?: number;
    retryInterval?: number;
}
export interface ConsulServiceOptions extends RegisterOptions {
    id: string;
    meta?: any;
    protocol?: string;
    check?: ConsulServiceCheckOptions;
    checks?: ConsulServiceCheckOptions[];
}
export interface ConsulModuleConfiguration {
    consul: ConsulClientOptions;
    service?: ConsulServiceOptions;
}
export interface IResourceConfiguration extends AxiosRequestConfig {
    path: string;
    mapper?(source: any, target: any): void;
}
export interface IServiceWatcherDelegate {
    onServiceDidRegister?(service: any): void;
    onServiceDidUpdate?(service: any): void;
    onServiceDidUnregister?(service: any): void;
}
