import BaseError from "./baseError";
import httpStatusCode from "./httpStatusCode";

class UnprocessableEntityError extends BaseError{
  constructor(
    name = 'Unprocessable Entity',
    statusCode = httpStatusCode.REQUEST_TIMEOUT,
    description: string
  ){
    super(name, statusCode, description);
  };
};

export default UnprocessableEntityError;