import BaseError from './baseError';
import { httpStatusCode } from './httpStatus';

class ForbiddenError extends BaseError {
  constructor(
    description: string | undefined,
    name = 'Forbidden',
    statusCode = httpStatusCode.FORBIDDEN,
  ) {
    super(name, statusCode, description);
  }
}

export default ForbiddenError;
