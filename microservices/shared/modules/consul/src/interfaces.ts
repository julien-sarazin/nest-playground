import * as Consul from 'consul';
import ConsulOptions = Consul.ConsulOptions;
import RegisterOptions = Consul.Agent.Service.RegisterOptions;

export interface ConsulModuleConfiguration {
    consul: ConsulOptions;
    service?: RegisterOptions | string;
}
