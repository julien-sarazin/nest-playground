import { ConsulModuleConfiguration } from '@shared/modules/consul/src';
import uuid = require('uuid');

export const CONSUL_CONFIG: ConsulModuleConfiguration = {
    consul: {
        host: '127.0.0.1',
        port: '8500',
        maxRetry: 5,
        retryInterval: 1000,
    },
    service: {
        id: uuid.v4(),
        name: 'auth',
        address: '127.0.0.1',
        port: parseInt(process.env.PORT),
        tags: ['auth', 'macro'],
        meta: {
            nestjs_version: '5.0.1',
            prefix: 'api',
        },
        check: {
            DeregisterCriticalServiceAfter: '20s',
            http: `http://host.docker.internal:${process.env.PORT}/health`,
            interval: '10s',
            ttl: '15s',
        },
    },
    collaborators: [
        {
            name: 'users',
        },
    ],
};
