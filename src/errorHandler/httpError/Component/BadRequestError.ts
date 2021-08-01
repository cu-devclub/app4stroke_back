import BaseError from "./baseError";
import httpStatusCode from "./httpStatusCode";

class BadRequestError extends BaseError{
  constructor(
    name = 'Bad Request',
    statusCode = httpStatusCode.BAD_REQUEST,
    description: string
  ){
    super(name, statusCode, description);
  };
};

export default BadRequestError;