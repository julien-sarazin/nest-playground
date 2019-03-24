"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const Consul = require("consul");
const lodash_1 = require("lodash");
const constants_1 = require("./constants");
const uuid = require("uuid");
let ConsulService = class ConsulService {
    constructor(consul, configuration) {
        this.consul = consul;
        this.configuration = configuration;
        this.logger = new common_1.Logger();
        /**
         * Common service information
         */
        this.serviceId = lodash_1.get(configuration, 'service.id', uuid.v4());
        this.serviceName = lodash_1.get(configuration, 'service.name', 'unknown-service');
        this.servicePort = lodash_1.get(configuration, 'service.port');
        this.serviceHost = lodash_1.get(configuration, 'service.host');
        this.serviceTags = lodash_1.get(configuration, 'service.tags');
        this.serviceMeta = lodash_1.get(configuration, 'service.meta');
        /**
         * Health check settings
         */
        this.check = lodash_1.get(configuration, 'service.check');
        /**
         * Consul fail checks
         */
        this.tries = 0;
        this.maxRetry = lodash_1.get(configuration, 'consul.maxRetry', 10);
        this.retryInterval = lodash_1.get(configuration, 'consul.retryInterval', 1000);
        process.on('SIGINT', () => this.unregister());
    }
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('Initializing module...');
            return this.register();
        });
    }
    onModuleDestroy() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('Destroying module...');
            return yield this.unregister();
        });
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            const service = this.getServiceInfo();
            console.log('service', service);
            try {
                yield this.consul.agent.service
                    .register(service);
                console.log('Register the service success.');
                this.resetTriesCount();
            }
            catch (e) {
                if (this.tries > this.maxRetry) {
                    console.error(`Maximum connection retry reached. Exiting.`);
                    process.exit(1);
                }
                console.warn(`Registering the service ${this.serviceName} failed.\n ${e} \n Retrying in ${this.retryInterval}`);
                this.tries++;
                setTimeout(() => this.register(), this.retryInterval);
            }
        });
    }
    unregister() {
        return __awaiter(this, void 0, void 0, function* () {
            const service = this.getServiceInfo();
            try {
                yield this.consul.agent.service
                    .deregister(service);
                console.log(`Unregistered the service ${service.name} successfully.`);
                this.resetTriesCount();
            }
            catch (e) {
                if (this.tries > this.maxRetry) {
                    this.logger.error('Deregister the service fail.', e);
                }
                console.warn(`Deregister the service fail, will retry after ${this.retryInterval}`);
                this.tries++;
                setTimeout(() => this.register(), this.retryInterval);
            }
        });
    }
    getServiceInfo() {
        return {
            id: this.serviceId,
            name: this.serviceName,
            address: this.serviceHost,
            port: this.servicePort,
            tags: this.serviceTags,
            meta: this.serviceMeta,
            check: this.check
        };
    }
    resetTriesCount() {
        this.tries = 0;
    }
};
ConsulService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(constants_1.CONSUL_CLIENT_PROVIDER)),
    __param(1, common_1.Inject(constants_1.CONSUL_CONFIGURATION_PROVIDER)),
    __metadata("design:paramtypes", [Object, Object])
], ConsulService);
exports.ConsulService = ConsulService;
