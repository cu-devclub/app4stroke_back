import BaseError from './baseError';
import { httpStatusCode } from './httpStatus';

class TooManyRequestError extends BaseError {
  constructor(
    description: string | undefined,
    name = 'too many request',
    statusCode = httpStatusCode.TOO_MANY_REQUEST,
  ) {
    super(name, statusCode, description);
  }
}

export default TooManyRequestError;
