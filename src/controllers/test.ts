import { Request, Response } from 'express';
import BaseError from '../errorHandler/httpError/Component/baseError';
import httpError from '../errorHandler/httpError/httpError';
import auth from '../middlewares/auth';
import decodeToken from '../middlewares/decodeToken';

const test = async (req: Request, res: Response): Promise<void> => {
  console.log(await auth(req, res));
};

export default test;
