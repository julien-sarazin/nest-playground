"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const users_module_1 = require("./modules/users/users.module");
const health_module_1 = require("./modules/health/health.module");
const src_1 = require("@shared/modules/consul/src");
const consul_development_1 = require("./config/consul.development");
const users_controller_1 = require("./modules/users/controller/users.controller");
const morgan = require("morgan");
let ApplicationModule = class ApplicationModule {
    configure(consumer) {
        consumer
            .apply(morgan('tiny'))
            .forRoutes(users_controller_1.UsersController);
    }
};
ApplicationModule = __decorate([
    common_1.Module({
        imports: [
            users_module_1.UsersModule,
            health_module_1.HealthModule,
            src_1.NestConsulModule.init(consul_development_1.CONSUL_CONFIG),
        ],
    })
], ApplicationModule);
exports.ApplicationModule = ApplicationModule;
//# sourceMappingURL=app.module.js.map