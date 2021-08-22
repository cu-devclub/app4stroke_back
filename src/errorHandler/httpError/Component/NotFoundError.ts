import BaseError from './baseError';
import { httpStatusCode } from './httpStatus';

class NotFoundError extends BaseError {
  constructor(
    description: string | undefined,
    name = 'Not Found',
    statusCode = httpStatusCode.NOT_FOUND,
  ) {
    super(name, statusCode, description);
  }
}

export default NotFoundError;
