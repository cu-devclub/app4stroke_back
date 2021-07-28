import BaseError from "./baseError";
import httpStatusCode from "./httpStatusCode";

class InternalServerError extends BaseError{
  constructor(
    name = 'internal server error',
    statusCode = httpStatusCode.INTERNAL_SERVER_ERROR,
    description: string
  ){
    super(name, statusCode, description);
  };
};

export default InternalServerError;