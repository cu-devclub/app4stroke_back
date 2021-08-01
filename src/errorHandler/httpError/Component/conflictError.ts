import BaseError from "./baseError";
import httpStatusCode from "./httpStatusCode";

class ConflictError extends BaseError{
  constructor(
    name = 'conflict',
    statusCode = httpStatusCode.CONFLICT,
    description: string
  ){
    super(name, statusCode, description);
  };
};

export default ConflictError;