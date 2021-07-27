class BaseError extends Error{
  
  name: string;
  statusCode: number;

  constructor(name:string, statusCode:number, description:string) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;

  };

};

export default BaseError;