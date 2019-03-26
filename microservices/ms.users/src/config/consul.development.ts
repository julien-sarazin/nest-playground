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
        name: 'users',
        address: 'localhost',
        port: 3001,
        tags: ['users'],
        meta: {
            nestjs_version: '5.0.1',
        },
        check: {
            DeregisterCriticalServiceAfter: '20s',
            http: 'http://localhost:3001/api/health/check',
            interval: '10s',
            ttl: '15s',
        },
    },
};
