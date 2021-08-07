import BaseError from "./baseError";
import httpStatusCode from "./httpStatusCode";

class ConflictError extends BaseError{
  constructor(
    description: string,
    name = 'conflict',
    statusCode = httpStatusCode.CONFLICT
  ){
    super(name, statusCode, description);
  };
};

export default ConflictError;