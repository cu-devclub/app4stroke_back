import BaseError from "./baseError";
import httpStatusCode from "./httpStatusCode";

class TooManyRequestError extends BaseError{
  constructor(
    description: string,
    name = 'too many request',
    statusCode = httpStatusCode.TOO_MANY_REQUEST
  ){
    super(name, statusCode, description);
  };
};

export default TooManyRequestError;