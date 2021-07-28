import BaseError from "./baseError";
import httpStatusCode from "./httpStatusCode";

class ForbiddenError extends BaseError {
  constructor(
    name = 'Forbidden',
    statusCode = httpStatusCode.FORBIDDEN,
    description: string
  ){
    super(name, statusCode, description);
  };
};

export default ForbiddenError;