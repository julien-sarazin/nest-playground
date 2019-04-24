import { KongModuleConfiguration } from '@shared/modules/kong/src';

export const KONG_CONFIG: KongModuleConfiguration = {
    kong: {
        host: process.env.KONG_HOST || '127.0.0.1',
        port: parseInt(process.env.KONG_PORT) || 8001,
        maxRetry: 5,
        retryInterval: 3000,
    },
    service: {
        upstream: process.env.KONG_UPSTREAM || 'partners.upstream',
        target: process.env.KONG_TARGET  || `host.docker.internal:${process.env.PROXY_PORT}`,
    },
};
