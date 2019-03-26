import { ConsulModuleConfiguration } from '@shared/modules/consul/src';
import uuid = require('uuid');

export const CONSUL_CONFIG: ConsulModuleConfiguration = {
    consul: {
        host: '127.0.0.1',
        port: process.env.PORT,
        maxRetry: 5,
        retryInterval: 1000,
    },
    service: {
        id: uuid.v4(),
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
