import BaseError from './baseError';
import statusCode from './httpStatusCode';

class NotFoundError extends BaseError{
  constructor(
    name = 'Not Found',
    code = statusCode.NOT_FOUND,
    description: string
  ){
    super(name, code, description)
  }
}

export default NotFoundError;