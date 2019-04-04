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
const users_service_1 = require("../service/users.service");
const create_dto_1 = require("../dto/create.dto");
const update_dto_1 = require("../dto/update.dto");
const criteria_decorator_1 = require("../../../decorators/criteria.decorator");
const authenticate_dto_1 = require("../dto/authenticate.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    list(criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService
                .list(criteria);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.usersService
                    .get(id);
            }
            catch (e) {
                throw (e instanceof users_service_1.UserNotFoundException)
                    ? new common_1.NotFoundException(e.message)
                    : new common_1.InternalServerErrorException(e);
            }
        });
    }
    peek(criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService
                .peek(criteria);
        });
    }
    create(userCreateDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.usersService
                    .create(userCreateDTO);
            }
            catch (e) {
                throw (e instanceof users_service_1.EmailAlreadyExistsException)
                    ? new common_1.ConflictException(e.message)
                    : new common_1.InternalServerErrorException(e);
            }
        });
    }
    update(id, userUpdateDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.usersService
                    .update(id, userUpdateDTO);
            }
            catch (e) {
                throw (e instanceof users_service_1.UserNotFoundException)
                    ? new common_1.NotFoundException(e.message)
                    : new common_1.InternalServerErrorException(e);
            }
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.usersService
                    .remove(id);
            }
            catch (e) {
                throw (e instanceof users_service_1.UserNotFoundException)
                    ? new common_1.NotFoundException(e.message)
                    : new common_1.InternalServerErrorException(e);
            }
        });
    }
    authenticate(authenticateDTO, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authenticated = yield this.usersService
                    .authenticate(authenticateDTO);
                return res
                    .status(common_1.HttpStatus.OK)
                    .send(authenticated);
            }
            catch (e) {
                throw (e instanceof users_service_1.UserNotFoundException)
                    ? new common_1.NotFoundException(e.message)
                    : new common_1.InternalServerErrorException(e);
            }
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, criteria_decorator_1.Criteria()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "list", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "get", null);
__decorate([
    common_1.Get('peek'),
    __param(0, criteria_decorator_1.Criteria()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "peek", null);
__decorate([
    common_1.Post(),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.UserCreateDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_dto_1.UserUpdateDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
__decorate([
    common_1.Post('authenticate'),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authenticate_dto_1.UserAuthenticateDTO, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "authenticate", null);
UsersController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [users_service_1.default])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map