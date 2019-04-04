"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONSUL_CONFIG = {
    consul: {
        host: process.env.CONSUL_HOST || '127.0.0.1',
        port: process.env.CONSUL_PORT || '8500',
        maxRetry: 5,
        retryInterval: 1000,
    },
    collaborators: [],
};
//# sourceMappingURL=consul.development.js.map