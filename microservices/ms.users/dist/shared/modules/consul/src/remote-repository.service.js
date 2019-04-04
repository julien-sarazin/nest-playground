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
const _ = require("lodash");
const common_1 = require("@nestjs/common");
let RemoteRepositoryService = class RemoteRepositoryService {
    constructor(ResourceType, index = 0, resourceName = ResourceType.name.toLocaleLowerCase()) {
        this.ResourceType = ResourceType;
        this.index = index;
        this.resourceName = resourceName;
    }
    get node() {
        if (this.nodes.length === 0) {
            throw new common_1.ServiceUnavailableException();
        }
        const loop = (this.index++) % this.nodes.length;
        return this.nodes[loop];
    }
    create(data, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const configuration = _.assignIn({ method: 'POST', url: this.resourceName, data }, config);
            return yield this.node
                .request(configuration)
                .then(response => _.assign(new this.ResourceType(), response.data));
        });
    }
    list(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const configuration = _.assignIn({ method: 'GET', url: this.resourceName }, config);
            return yield this.node
                .request(configuration)
                .then(response => response.data.map(data => _.assign(new this.ResourceType(), data)));
        });
    }
    pick(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const configuration = _.assignIn({ method: 'GET', url: this.resourceName + '/peek' }, config);
            return yield this.node
                .request(configuration)
                .then(response => _.assign(new this.ResourceType(), response.data));
        });
    }
    raw(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const configuration = _.assignIn({}, config);
            return yield this.node
                .request(configuration)
                .then(response => response.data);
        });
    }
    remove(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const configuration = _.assignIn({ method: 'DELETE', url: this.resourceName }, config);
            yield this.node
                .request(configuration);
        });
    }
    update(data, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const configuration = _.assignIn({ method: 'PUT', url: this.resourceName, data }, config);
            return yield this.node
                .request(configuration)
                .then(response => _.assign(new this.ResourceType(), response.data));
        });
    }
    onNodesDidChange(nodes) {
        this.nodes = nodes;
    }
};
RemoteRepositoryService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [Object, Number, String])
], RemoteRepositoryService);
exports.RemoteRepositoryService = RemoteRepositoryService;
//# sourceMappingURL=remote-repository.service.js.map