import decodeToken from '../middlewares/decodeToken';
import { Request, Response } from 'express';
import BaseError from '../errorHandler/httpError/Component/baseError';
import user, { User } from '../models/user';

const auth = async (req: Request, res: Response): Promise<User | null> => {
  try {
    let decode = await decodeToken(req);
    if (decode instanceof BaseError) {
      throw decode;
    } else {
      let userInformation: User = await user.findOne({
        username: decode.username,
      });
      return userInformation;
    }
  } catch (e: unknown) {
    if (e instanceof BaseError) {
      res.status(e.statusCode).send(e);
      return null;
    }
  }
  return null;
};

export default auth;
