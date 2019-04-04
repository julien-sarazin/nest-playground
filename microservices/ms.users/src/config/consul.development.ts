import { ConsulModuleConfiguration } from '@shared/modules/consul/src';
import uuid = require('uuid');

export const CONSUL_CONFIG: ConsulModuleConfiguration = {
    consul: {
        host: process.env.CONSUL_HOST || '127.0.0.1',
        port: process.env.CONSUL_PORT || '8500',
        maxRetry: 5,
        retryInterval: 1000,
    },
    collaborators: [],
};
