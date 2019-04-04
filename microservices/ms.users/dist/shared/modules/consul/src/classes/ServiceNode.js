"use strict";
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
const axios_1 = require("axios");
const common_1 = require("@nestjs/common");
class ServiceNode {
    constructor(configuration) {
        configuration = _.mapKeys(configuration, (v, k) => k.toLowerCase());
        common_1.Logger.debug('Service node configuration:' + JSON.stringify(configuration, null, 4), ServiceNode.name);
        this.id = configuration.id;
        this.service = configuration.service;
        this.meta = configuration.meta;
        this.host = configuration.address;
        this.port = configuration.port;
        this.axios = axios_1.default.create({ baseURL: `http://${this.host}${this.port !== 80 ? `:${this.port}` : ''}/api` });
    }
    request(configuration) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.axios
                .request(configuration);
        });
    }
}
exports.ServiceNode = ServiceNode;
//# sourceMappingURL=ServiceNode.js.map