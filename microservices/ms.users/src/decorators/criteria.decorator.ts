import { createParamDecorator } from '@nestjs/common';
import * as _ from 'lodash';

class QueryCriteria {
  // Todo
}

export const Criteria = createParamDecorator((path, req) => {
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
