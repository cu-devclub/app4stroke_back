import BaseError from "./baseError";
import httpStatusCode from "./httpStatusCode";

class UnauthorizedError extends BaseError {
  constructor(
    description: string,
    name = 'Unauthorized',
    statusCode = httpStatusCode.UNAUTHORIZED
  ){
    super(name, statusCode, description)
  };
};

export default UnauthorizedError;