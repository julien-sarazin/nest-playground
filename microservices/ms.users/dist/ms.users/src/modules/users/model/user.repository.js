"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("typeorm");
let UsersRepository = class UsersRepository extends typeorm_1.Repository {
};
UsersRepository = __decorate([
    typeorm_1.EntityRepository(user_entity_1.User)
], UsersRepository);
exports.default = UsersRepository;
exports.UsersRepositoryProvider = {
    provide: 'UsersRepository',
    useFactory: (connection) => connection.getCustomRepository(UsersRepository),
    inject: ['DbConnection'],
};
//# sourceMappingURL=user.repository.js.map