/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

interface User {
  username: string;
  email: string;
  password: string;
}

interface UserRequest extends Request {
  user: User;
}

export default {
  function(req: UserRequest, res: Response, next: any) {
    const token = req.header('token');
    if (!token) return res.status(401).json({ message: 'Auth Error' });

    try {
      const decoded = jwt.verify(token, 'randomString');
      req.user = <User>decoded;
      next();
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: 'Invalid Token' });
    }
  },
};
