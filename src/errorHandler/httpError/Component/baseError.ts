import { httpStatusText } from './httpStatus';

class BaseError extends Error {
  name: string;
  statusCode: number;
  statusText: string;
  description: string;

  constructor(
    name: string,
    statusCode: number | string,
    description: string | undefined,
  ) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = Number(statusCode);
    this.statusText = httpStatusText[this.statusCode];
    this.description = String(description);
    console.log(this.message);
  }
}

export default BaseError;
