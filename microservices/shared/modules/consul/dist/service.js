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
const RemoteService_1 = require("./classes/RemoteService");
const uuid = require("uuid");
let ConsulService = class ConsulService {
    constructor(consul, configuration, logger) {
        this.consul = consul;
        this.configuration = configuration;
        this.logger = logger;
        this.logger = this.logger || new common_1.Logger();
        /**
         * Common service information
         */
        this.localService = configuration.service;
        this.localService.id = this.localService.id || uuid.v4();
        /**
         * Consul fail checks
         */
        this.tries = 0;
        this.maxRetry = lodash_1.get(configuration, 'consul.maxRetry', 10);
        this.retryInterval = lodash_1.get(configuration, 'consul.retryInterval', 1000);
    }
    next(c) {
        const criteria = (typeof c === 'string')
            ? { name: c }
            : c;
        /**
         * Getting the first matching implies the array is
         * maintained sorted.
         */
        const configuration = this.remoteServices
            .find(rs => rs.name === criteria.name);
        return new RemoteService_1.RemoteService(configuration);
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
            this.logger.log(`> Registering ${this.localService.name} ...`);
            try {
                yield this.consul.agent.service
                    .register(this.localService);
                this.logger.log(`> Registered the service ${this.localService.name} successfully.`);
                this.resetTriesCount();
            }
            catch (e) {
                if (this.tries > this.maxRetry) {
                    this.logger.error(`> Maximum connection retry reached. Exiting.`);
                    process.exit(1);
                }
                this.logger.warn(`Registering the service ${this.localService.name} failed.\n ${e} \n Retrying in ${this.retryInterval}`);
                this.tries++;
                setTimeout(() => this.register(), this.retryInterval);
            }
        });
    }
    unregister() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.consul.agent.service
                    .deregister(this.localService);
                this.logger.log(`Unregistered the service ${this.localService.name} successfully.`);
                this.resetTriesCount();
            }
            catch (e) {
                if (this.tries > this.maxRetry) {
                    this.logger.error('Deregister the service fail.', e);
                }
                this.logger.warn(`Deregister the service fail, will retry after ${this.retryInterval}`);
                this.tries++;
                setTimeout(() => this.register(), this.retryInterval);
            }
        });
    }
    resetTriesCount() {
        this.tries = 0;
    }
};
ConsulService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [Object, Object, Object])
], ConsulService);
exports.ConsulService = ConsulService;
