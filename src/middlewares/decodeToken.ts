import { Request } from 'express';
import httpError from '../errorHandler/httpError/httpError';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { User } from '../models/user';
import BaseError from '../errorHandler/httpError/Component/baseError';

interface UserDecode extends jwt.JwtPayload {
  username: string;
  iat: number;
  exp: number;
}

const decodeToken = async (req: Request): Promise<UserDecode | BaseError> => {
  try {
    let authType = req.header('Authorization')?.split(' ')[0];
    let token = req.header('Authorization')?.split(' ')[1];
    if (authType != 'Bearer' || !token) {
      throw httpError(
        401,
        'Authenticate Error : Wrong method or Invalid token',
      );
    }
    try {
      if (token) {
        const decode: UserDecode = <UserDecode>(
          jwt.verify(token, process.env.JWT_SECRET_KEY || 'KEY')
        );
        if (decode.exp >= new Date().getTime() / 1000) {
          return decode;
        } else {
          throw httpError(401, 'Authenticate Error : Token expire');
        }
      }
    } catch (e: unknown) {
      if (e instanceof JsonWebTokenError) {
        throw httpError(401, 'Authenticate Error : Wrong Token');
      }
    }
  } catch (e: unknown) {
    if (e instanceof BaseError) {
      return e;
    }
  }
  return httpError(500, 'Internal Server Error : Imposable Statement');
};

export default decodeToken;
