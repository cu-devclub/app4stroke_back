import BadRequestError from './Component/BadRequestError';
import ConflictError from './Component/conflictError';
import ForbiddenError from './Component/ForbiddenError';
import InternalServerError from './Component/InternalServerError';
import NotFoundError from './Component/NotFoundError';
import RequestTimeoutError from './Component/RequestTimeoutError';
import TooManyRequestError from './Component/TooManyRequestError';
import UnauthorizedError from './Component/UnauthorizedError';
import UnprocessableEntityError from './Component/UnprocessableEntityError';
import BaseError from './Component/baseError';

const httpError = (code: number, description?: string) => {
  switch (code) {
    case 400:
      return new BadRequestError(description);
    case 401:
      return new UnauthorizedError(description);
    case 403:
      return new ForbiddenError(description);
    case 404:
      return new NotFoundError(description);
    case 408:
      return new RequestTimeoutError(description);
    case 409:
      return new ConflictError(description);
    case 422:
      return new UnprocessableEntityError(description);
    case 429:
      return new TooManyRequestError(description);
    case 500:
      return new InternalServerError(description);
    default:
      return new BaseError('Unknow Error', 0, description);
  }
};

export default httpError;
