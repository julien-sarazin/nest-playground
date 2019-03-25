import * as Consul from 'consul';
import Service = Consul.Agent.Service;
export interface ServiceConfiguration extends Service.RegisterOptions {
    id: string;
    protocol?: string;
    meta: any;
}
