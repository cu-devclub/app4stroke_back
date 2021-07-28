import BaseError from "./baseError";
import httpStatusCode from "./httpStatusCode";

class TooManyRequestError extends BaseError{
  constructor(
    name = 'too many request',
    statusCode = httpStatusCode.TOO_MANY_REQUEST,
    description: string
  ){
    super(name, statusCode, description);
  };
};

export default TooManyRequestError;