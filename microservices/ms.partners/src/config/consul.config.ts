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
        name: 'partners',
        address: process.env.PROXY_HOST || '127.0.0.1',
        port: parseInt(process.env.PROXY_PORT),
        tags: ['partners', 'micro'],
        meta: {
            nestjs_version: '5.0.1',
            prefix: 'api',
        },
        check: {
            DeregisterCriticalServiceAfter: '20s',
            http: process.env.CONSUL_HEALTH_ADDRESS || `http://host.docker.internal:${process.env.PORT}/health`,
            interval: '10s',
            ttl: '15s',
        },
    },
    collaborators: [],
};
