/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { User } from '../models/user';

interface Idecode extends jwt.JwtPayload {
  user?: User;
  iat: number;
  exp: number;
}

export default (req: Request, res: Response, next: any) => {
  let token = req.header('authorization');
  if (token) {
    token = token.split(' ')[1];
  } else {
    return res.status(401).json({ message: 'Auth Error' });
  }
  try {
    const decoded: Idecode = <Idecode>jwt.verify(token, 'randomString');
    req.user = {
      id: decoded.user?.id,
      username: decoded.user?.username,
      email: decoded.user?.email,
    };

    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Invalid Token' });
  }
};
