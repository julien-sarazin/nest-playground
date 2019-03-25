import Service = Consul.Agent.Service;
import * as Consul from 'consul';

export interface ConsulCriteria extends Service.RegisterOptions {
    next: string;
}
