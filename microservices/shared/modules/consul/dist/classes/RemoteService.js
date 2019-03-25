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
const axios_1 = require("axios");
const path = require("path");
class RemoteService {
    constructor(configuration) {
        this.protocol = configuration.protocol || 'http://';
        this.port = configuration.port;
        this.basePath = configuration.meta.basePath;
    }
    get(resourcePath, configuration) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = path.join(this.protocol, this.basePath, resourcePath);
            return yield axios_1.default
                .get(uri, configuration);
        });
    }
    post(resourcePath, data, configuration) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = path.join(this.protocol, this.basePath, resourcePath);
            return yield axios_1.default
                .post(uri, data, configuration);
        });
    }
    put(resourcePath, data, configuration) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = path.join(this.protocol, this.basePath, resourcePath);
            return yield axios_1.default
                .put(uri, data, configuration);
        });
    }
    delete(resourcePath, configuration) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = path.join(this.protocol, this.basePath, resourcePath);
            return yield axios_1.default
                .delete(uri, configuration);
        });
    }
}
exports.RemoteService = RemoteService;
