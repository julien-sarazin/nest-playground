import { ConsulModuleConfiguration } from '@shared/modules/consul/src';
import uuid = require('uuid');

export const CONSUL_CONFIG: ConsulModuleConfiguration = {
    consul: {
        host: process.env.CONSUL_HOST || '127.0.0.1',
        port: process.env.CONSUL_PORT || '8500',
        maxRetry: 5,
        retryInterval: 1000,
    },
    service: {
        id: uuid.v4(),
        name: 'users',
        address: 'host.docker.internal',
        port: parseInt(process.env.PORT),
        tags: ['users', 'micro'],
        meta: {
            nestjs_version: '5.0.1',
            prefix: 'api',
        },
        check: {
            DeregisterCriticalServiceAfter: '20s',
            http: `http://host.docker.internal:${process.env.PORT}/api/health/check`,
            interval: '10s',
            ttl: '15s',
        },
    },
    collaborators: [],
};
