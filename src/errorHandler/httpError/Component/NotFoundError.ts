import BaseError from './baseError';
import httpStatusCode from './httpStatusCode';

class NotFoundError extends BaseError{
  constructor(
    description: string,
    name = 'Not Found',
    statusCode = httpStatusCode.NOT_FOUND
  ){
    super(name, statusCode, description);
  };
};

export default NotFoundError;