import BaseError from './baseError';
import { httpStatusCode } from './httpStatus';

class ConflictError extends BaseError {
  constructor(
    description: string | undefined,
    name = 'conflict',
    statusCode = httpStatusCode.CONFLICT,
  ) {
    super(name, statusCode, description);
  }
}

export default ConflictError;
