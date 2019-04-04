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
const typeorm_1 = require("typeorm");
let User = class User {
    setUpdatedDate() {
        this.updatedAt = new Date();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: false, select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "streetAddress", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "zipCode", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "setUpdatedDate", null);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map