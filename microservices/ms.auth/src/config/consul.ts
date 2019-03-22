export const CONSUL_CLIENT_CONFIG = {
    host: '127.0.0.1',
    port: '8500',
};

export const CONSUL_SERVICE_CONFIG = {
    name: 'auth-service' +
      '',
    address: 'localhost',
    port: 3002,
    id: 'aeffa3d2c385475c1',
    check: {
        ttl: '10s',
        deregister_critical_service_after: '1m',
    },
};
