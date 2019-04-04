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
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class UserCreateDTO {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserCreateDTO.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserCreateDTO.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], UserCreateDTO.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(4),
    class_validator_1.MaxLength(16),
    __metadata("design:type", String)
], UserCreateDTO.prototype, "password", void 0);
__decorate([
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Date)
], UserCreateDTO.prototype, "birthDate", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserCreateDTO.prototype, "streetAddress", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserCreateDTO.prototype, "zipCode", void 0);
exports.UserCreateDTO = UserCreateDTO;
//# sourceMappingURL=create.dto.js.map