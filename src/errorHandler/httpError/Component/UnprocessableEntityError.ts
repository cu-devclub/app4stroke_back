import BaseError from './baseError';
import { httpStatusCode } from './httpStatus';

class UnprocessableEntityError extends BaseError {
  constructor(
    description: string | undefined,
    name = 'Unprocessable Entity',
    statusCode = httpStatusCode.REQUEST_TIMEOUT,
  ) {
    super(name, statusCode, description);
  }
}

export default UnprocessableEntityError;
