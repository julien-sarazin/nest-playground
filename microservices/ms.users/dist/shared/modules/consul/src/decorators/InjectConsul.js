"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const common_1 = require("@nestjs/common");
exports.InjectConsul = () => common_1.Inject(constants_1.CONSUL_CLIENT_PROVIDER);
//# sourceMappingURL=InjectConsul.js.map