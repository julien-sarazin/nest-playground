import { ConsulModuleConfiguration } from '@shared/modules/consul/src';

export const CONSUL_CONFIG: ConsulModuleConfiguration = {
    consul: {
        host: '127.0.0.1',
        port: '8500',
        maxRetry: 5,
        retryInterval: 1000,
    },
    service: {
        name: 'auth',
        address: 'localhost',
        port: 3002,
        tags: ['auth', 'macro'],
        meta: {
            nestjs_version: '5.0.1',
        },
        check: {
            DeregisterCriticalServiceAfter: '1m',
            http: 'http://localhost:3002/api/health/check',
            interval: '10s',
            ttl: '15s',
        },
    },
};
