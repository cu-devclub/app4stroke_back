import BaseError from "./baseError";
import httpStatusCode from "./httpStatusCode";

class InternalServerError extends BaseError{
  constructor(
    description: string,
    name = 'internal server error',
    statusCode = httpStatusCode.INTERNAL_SERVER_ERROR
  ){
    super(name, statusCode, description);
  };
};

export default InternalServerError;