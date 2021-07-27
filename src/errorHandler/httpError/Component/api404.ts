import BaseError from './baseError';
import statusCode from './statusCode';

class Api404 extends BaseError{
  constructor(
    name:string = 'Not Found',
    code:number = statusCode.NOT_FOUND,
    description: string
  ){
    super(name, code , description)
  }
}

export default Api404