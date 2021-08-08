import BaseError from "./baseError";
import httpStatusCode from "./httpStatusCode";

class ForbiddenError extends BaseError {
  constructor(
    description: string,
    name = 'Forbidden',
    statusCode = httpStatusCode.FORBIDDEN
  ){
    super(name, statusCode, description);
  };
};

export default ForbiddenError;