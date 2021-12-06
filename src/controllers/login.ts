import { Request, Response } from 'express';
import user, { User } from '../models/user';
import bcrypt from 'bcryptjs';
import httpError from '../errorHandler/httpError/httpError';
import BaseError from '../errorHandler/httpError/Component/baseError';
import jwt from 'jsonwebtoken';
const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw httpError(400, 'Authenticate Error : Invalid Username or Password');
    }
    const aUser: User = await user.findOne({ username: username });
    if (aUser) {
      const isMatch: boolean = await bcrypt.compare(password, aUser.password);
      if (!isMatch) {
        throw httpError(
          401,
          'Authenticate Error : Username and Password not match',
        );
      } else {
        res.json({
          token: jwt.sign(
            { username: aUser.username },
            process.env.JWT_SECRET_KEY || 'KEY',
            { expiresIn: 60 },
          ),
        });
      }
    } else {
      throw httpError(401, 'Authenticate Error : Username Not Found');
    }
  } catch (e: unknown) {
    console.log(e);

    if (e instanceof BaseError) {
      res.status(e.statusCode).send(e);
    }
  }
};
export default login;
