"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var ConsulModule_1;
const common_1 = require("@nestjs/common");
const Consul = require("consul");
const service_1 = require("./service");
const constants_1 = require("./constants");
let ConsulModule = ConsulModule_1 = class ConsulModule {
    static init(options) {
        /**
         * Forcing the promisification
         */
        options.consul.promisify = true;
        const consulConfigurationProvider = {
            provide: constants_1.CONSUL_CONFIGURATION_PROVIDER,
            useFactory: () => {
                /**
                 * TODO: lean the configuration with default properties.
                 */
                return options;
            },
        };
        /**
         * Configure consul client by connecting to the client agent
         * and register the current API if configuration is provided.
         */
        const consulClientProvider = {
            provide: constants_1.CONSUL_CLIENT_PROVIDER,
            useFactory: () => __awaiter(this, void 0, void 0, function* () {
                return yield new Consul(options.consul);
            }),
        };
        const consulServiceProvider = {
            provide: constants_1.CONSUL_SERVICE_PROVIDER,
            useFactory: (consulClient, consulConfiguration) => __awaiter(this, void 0, void 0, function* () {
                return new service_1.ConsulService(consulClient, consulConfiguration);
            }),
            inject: [constants_1.CONSUL_CLIENT_PROVIDER, constants_1.CONSUL_CONFIGURATION_PROVIDER],
        };
        return {
            module: ConsulModule_1,
            providers: [consulConfigurationProvider, consulClientProvider, consulServiceProvider],
            exports: [consulServiceProvider],
        };
    }
};
ConsulModule = ConsulModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], ConsulModule);
exports.ConsulModule = ConsulModule;
