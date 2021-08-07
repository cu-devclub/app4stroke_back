import BaseError from "./baseError";
import httpStatusCode from "./httpStatusCode";

class RequestTimeoutError extends BaseError{
  constructor(
    description: string,
    name = 'Request Timeout',
    statusCode = httpStatusCode.REQUEST_TIMEOUT
  ){
    super(name, statusCode, description);
  };
};

export default RequestTimeoutError;