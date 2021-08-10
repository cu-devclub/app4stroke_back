import BaseError from './baseError';
import { httpStatusCode } from './httpStatus';

class BadRequestError extends BaseError {
  constructor(
    description: string | undefined,
    name = 'Bad Request',
    statusCode = httpStatusCode.BAD_REQUEST,
  ) {
    super(name, statusCode, description);
  }
}

export default BadRequestError;
