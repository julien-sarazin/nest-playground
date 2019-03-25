import * as Consul from 'consul';
import ConsulOptions = Consul.ConsulOptions;
import RegisterOptions = Consul.Agent.Service.RegisterOptions;
import RegisterCheck = Consul.Agent.Service.RegisterCheck;
export interface ConsulServiceCheckOptions extends RegisterCheck {
    DeregisterCriticalServiceAfter: string;
}
export interface ConsulClientOptions extends ConsulOptions {
    maxRetry?: number;
    retryInterval?: number;
}
export interface ConsulServiceOptions extends RegisterOptions {
    meta?: any;
    check?: ConsulServiceCheckOptions;
    checks?: ConsulServiceCheckOptions[];
}
export interface ConsulModuleConfiguration {
    consul: ConsulClientOptions;
    service?: ConsulServiceOptions;
}
