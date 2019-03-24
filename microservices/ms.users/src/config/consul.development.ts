export const CONSUL_CONFIG = {
    consul: {
        host: '127.0.0.1',
        port: '8500',
        maxRetry: 5,
        retryInterval: 1000,
    },
    service: {
        name: 'users',
        host: 'localhost',
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
        weights: {
            passing: 10,
            warning: 1,
        },
    },
};
