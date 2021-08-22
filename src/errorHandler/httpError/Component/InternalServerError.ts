import BaseError from './baseError';
import { httpStatusCode } from './httpStatus';

class InternalServerError extends BaseError {
  constructor(
    description: string | undefined,
    name = 'internal server error',
    statusCode = httpStatusCode.INTERNAL_SERVER_ERROR,
  ) {
    super(name, statusCode, description);
  }
}

export default InternalServerError;
