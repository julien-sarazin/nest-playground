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
const user_entity_1 = require("../model/user.entity");
const user_repository_1 = require("../model/user.repository");
const bcrypt_1 = require("bcrypt");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    list(criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersRepository
                .find(criteria);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.usersRepository
                .findOne(id);
            if (!entity) {
                throw new UserNotFoundException();
            }
            return entity;
        });
    }
    peek(criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersRepository
                .findOne(criteria);
        });
    }
    create(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.usersRepository
                .findOne({ email: dto.email });
            if (user) {
                throw new EmailAlreadyExistsException('Email already used.');
            }
            user = Object.assign(new user_entity_1.User(), dto);
            user.password = yield bcrypt_1.hash(dto.password, 10);
            return yield this.usersRepository
                .save(user);
        });
    }
    update(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.usersRepository
                .findOne(id);
            if (!user) {
                throw new UserNotFoundException(`No user with the identifier ${id}`);
            }
            user = Object.assign(user, dto);
            yield this.usersRepository
                .save(user);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.usersRepository
                .findOne(id);
            if (!entity) {
                throw new UserNotFoundException(`No user with the identifier ${id}`);
            }
            yield this.usersRepository
                .remove(entity);
        });
    }
    authenticate(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository
                .findOne({
                select: ['id', 'email', 'password'],
                where: {
                    email: dto.email,
                },
            });
            if (!user) {
                throw new UserNotFoundException();
            }
            const same = yield bcrypt_1.compare(dto.password, user.password);
            if (same) {
                delete user.password;
                delete user.email;
                return user;
            }
            throw new UserNotFoundException();
        });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('UsersRepository')),
    __metadata("design:paramtypes", [user_repository_1.default])
], UsersService);
exports.default = UsersService;
class UserNotFoundException extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UserNotFoundException = UserNotFoundException;
class EmailAlreadyExistsException extends Error {
    constructor(message) {
        super(message);
    }
}
exports.EmailAlreadyExistsException = EmailAlreadyExistsException;
//# sourceMappingURL=users.service.js.map