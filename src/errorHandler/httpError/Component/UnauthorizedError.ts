import BaseError from "./baseError";
import httpStatusCode from "./httpStatusCode";

class UnauthorizedError extends BaseError {
  constructor(
    name = 'Unauthorized',
    statusCode = httpStatusCode.UNAUTHORIZED,
    description: string
  ){
    super(name, statusCode, description)
  };
};

export default UnauthorizedError;