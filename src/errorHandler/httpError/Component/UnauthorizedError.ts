import BaseError from './baseError';
import { httpStatusCode } from './httpStatus';

class UnauthorizedError extends BaseError {
  constructor(
    description: string | undefined,
    name = 'Unauthorized',
    statusCode = httpStatusCode.UNAUTHORIZED,
  ) {
    super(name, statusCode, description);
  }
}

export default UnauthorizedError;
