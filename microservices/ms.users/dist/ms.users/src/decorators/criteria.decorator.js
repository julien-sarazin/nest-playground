"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const _ = require("lodash");
class QueryCriteria {
}
exports.Criteria = common_1.createParamDecorator((path, req) => {
    try {
        const criteria = JSON.parse(req.query.criteria);
        return (path)
            ? _.get(criteria, path)
            : criteria;
    }
    catch (e) {
        return undefined;
    }
});
//# sourceMappingURL=criteria.decorator.js.map