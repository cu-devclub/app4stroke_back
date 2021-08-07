import BaseError from "./baseError";
import httpStatusCode from "./httpStatusCode";

class UnprocessableEntityError extends BaseError{
  constructor(
    description: string,
    name = 'Unprocessable Entity',
    statusCode = httpStatusCode.REQUEST_TIMEOUT
  ){
    super(name, statusCode, description);
  };
};

export default UnprocessableEntityError;