import BaseError from './baseError';
import httpStatusCode from './httpStatusCode';

class NotFoundError extends BaseError{
  constructor(
    name = 'Not Found',
    statusCode = httpStatusCode.NOT_FOUND,
    description: string
  ){
    super(name, statusCode, description);
  };
};

export default NotFoundError;