import BaseError from "./baseError";
import httpStatusCode from "./httpStatusCode";

class RequestTimeoutError extends BaseError{
  constructor(
    name = 'Request Timeout',
    statusCode = httpStatusCode.REQUEST_TIMEOUT,
    description: string
  ){
    super(name, statusCode, description);
  };
};

export default RequestTimeoutError;