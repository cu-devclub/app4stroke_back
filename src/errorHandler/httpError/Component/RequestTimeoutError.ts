import BaseError from './baseError';
import { httpStatusCode } from './httpStatus';

class RequestTimeoutError extends BaseError {
  constructor(
    description: string | undefined,
    name = 'Request Timeout',
    statusCode = httpStatusCode.REQUEST_TIMEOUT,
  ) {
    super(name, statusCode, description);
  }
}

export default RequestTimeoutError;
