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
var NestConsulService_1;
const common_1 = require("@nestjs/common");
const Consul = require("consul");
const lodash_1 = require("lodash");
const remote_repository_service_1 = require("./remote-repository.service");
const ServiceNode_1 = require("./classes/ServiceNode");
const uuid = require("uuid");
let NestConsulService = NestConsulService_1 = class NestConsulService {
    constructor(consul, configuration, logger) {
        this.consul = consul;
        this.configuration = configuration;
        this.logger = logger;
        this.collaborators = new Map();
        this.logger = this.logger || new common_1.Logger(NestConsulService_1.name);
        this.localService = configuration.service;
        this.localService.id = this.localService.id || uuid.v4();
        this.tries = 0;
        this.maxRetry = lodash_1.get(configuration, 'consul.maxRetry', 10);
        this.retryInterval = lodash_1.get(configuration, 'consul.retryInterval', 1000);
    }
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.register();
            yield this.discover();
            yield this.setupProcessHandlers();
        });
    }
    onModuleDestroy() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.unregister();
        });
    }
    getRemoteRepository(Type, service) {
        this.logger.log('Providing remote repository for service: ' + Type.name.toLocaleLowerCase(), NestConsulService_1.name);
        let collaborators = this.collaborators.get(service);
        if (!collaborators) {
            collaborators = { nodes: [], listeners: [] };
            this.collaborators.set(service, collaborators);
        }
        const repository = new remote_repository_service_1.RemoteRepositoryService(Type);
        this.addServiceListener(service, repository);
        return repository;
    }
    addServiceListener(service, listener) {
        const collaborators = this.collaborators.get(service);
        if (!collaborators) {
            throw new ServiceUnavailableError();
        }
        collaborators.listeners.push(listener);
        listener.onNodesDidChange(collaborators.nodes);
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Registering service ${this.localService} ...`, NestConsulService_1.name);
            try {
                yield this.consul.agent.service
                    .register(this.localService);
                this.logger.log(`Registration succeeded.`, NestConsulService_1.name);
                this.resetTriesCount();
            }
            catch (e) {
                if (this.tries > this.maxRetry) {
                    this.logger.error(`> Maximum connection retry reached. Exiting.`);
                    process.exit(1);
                }
                this.logger.warn(`Registering the service ${this.localService} failed.\n ${e} \n Retrying in ${this.retryInterval}`);
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
    discover() {
        return __awaiter(this, void 0, void 0, function* () {
            const self = this;
            return Promise
                .all(self.configuration.collaborators.map(collaborator => fetch(collaborator.name).then(watch)));
            function fetch(serviceName) {
                return __awaiter(this, void 0, void 0, function* () {
                    self.logger.debug(`Fetching health for ${serviceName}.service`, NestConsulService_1.name);
                    const options = { service: serviceName };
                    const healthData = yield self.consul.health.service(options);
                    let collaborators = self.collaborators
                        .get(serviceName);
                    if (!collaborators) {
                        collaborators = { nodes: healthData.map(data => new ServiceNode_1.ServiceNode(data.Service)), listeners: [] };
                        self.collaborators.set(serviceName, collaborators);
                    }
                    else {
                        collaborators.nodes = healthData.map(data => new ServiceNode_1.ServiceNode(data.Service));
                        collaborators.listeners.forEach(l => l.onNodesDidChange(collaborators.nodes));
                    }
                    self.logger.debug('collaborators:' + JSON.stringify(self.collaborators.entries(), null, 4), NestConsulService_1.name);
                    return serviceName;
                });
            }
            function watch(serviceName) {
                return __awaiter(this, void 0, void 0, function* () {
                    self.logger.debug(`Watching service ${serviceName}`, NestConsulService_1.name);
                    const options = {
                        service: serviceName,
                        passing: true,
                    };
                    const watch = self.consul
                        .watch({ method: self.consul.health.service, options });
                    watch.on('change', (changes, res) => {
                        let collaborators = self.collaborators
                            .get(serviceName);
                        if (!collaborators) {
                            collaborators = { nodes: changes.map(data => new ServiceNode_1.ServiceNode(data.Service)), listeners: [] };
                            self.collaborators.set(serviceName, collaborators);
                        }
                        else {
                            collaborators.nodes = changes.map(data => new ServiceNode_1.ServiceNode(data.Service));
                            collaborators.listeners.forEach(l => l.onNodesDidChange(collaborators.nodes));
                        }
                        self.logger.debug('collaborators:' + JSON.stringify(self.collaborators.get(serviceName), null, 4), NestConsulService_1.name);
                    });
                    watch.on('error', err => self.logger.error('error:' + err));
                });
            }
        });
    }
    setupProcessHandlers() {
        process.on('SIGINT', () => __awaiter(this, void 0, void 0, function* () {
            yield this.unregister();
            process.exit(0);
        }));
        process.on('exit', () => __awaiter(this, void 0, void 0, function* () {
            yield this.unregister();
            process.exit(0);
        }));
    }
    resetTriesCount() {
        this.tries = 0;
    }
};
NestConsulService = NestConsulService_1 = __decorate([
    common_1.Injectable(),
    __param(2, common_1.Optional()),
    __metadata("design:paramtypes", [Object, Object, Object])
], NestConsulService);
exports.NestConsulService = NestConsulService;
class ServiceUnavailableError extends Error {
}
exports.ServiceUnavailableError = ServiceUnavailableError;
//# sourceMappingURL=nest-consul.service.js.map