import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import auth from '../middlewares/auth';
import User from '../models/user';

interface UserRequest extends Request {
  user: {
    username: string;
    email: string;
    password: string;
    permissions: string;
    id: string;
  };
}

export default {
  signup: async (req: Request, res: Response): Promise<void> => {
    [
      check('username', 'Please Enter a Valid Username').not().isEmpty(),
      check('email', 'Please enter a valid email').isEmail(),
      check('password', 'Please enter a valid password').isLength({ min: 6 }),
    ];

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
      return;
    }

    const { username, email, password } = req.body;
    try {
      const user_email = await User.findOne({
        email,
      });
      const user_username = await User.findOne({
        username,
      });
      if (user_email) {
        res.status(400).json({
          msg: 'User with that email already exists',
        });
        return;
      }
      if (user_username) {
        res.status(400).json({
          msg: 'User with that username already exists',
        });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const user = new User({
        username: username,
        email: email,
        password: hashPassword,
      });

      await user.save();

      res.status(200).json({
        message: 'sign up success',
      });
    } catch (err) {
      console.log(err);
      res.status(500).send('Error in Saving');
    }
  },

  login: async (req: Request, res: Response) => {
    [
      check('email', 'Please enter a valid email').isEmail(),
      check('password', 'Please enter a valid password').isLength({ min: 6 }),
    ];

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        email,
      });
      if (!user)
        return res.status(400).json({
          message: 'Username or Password is Incorrect',
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: 'Username or Password is Incorrect',
        });

      const payload = {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      };

      jwt.sign(
        payload,
        'randomString',
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
        },
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: 'Server Error',
      });
    }
  },

  me: async (req: Request, res: Response) => {
    try {
      isUserRequest(req);
      res.json({ username: req.user.username, email: req.user.email });
    } catch (e) {
      res.send({ message: 'Error in Fetching user' });
    }
  },

  getUser: (req: Request, res: Response): void => {
    res.render('/addOrEdit', {
      viewTitle: 'Insert User',
    });
  },

  postUser: (req: Request, res: Response): void => {
    if (req.body._id == '') insertRecord(req, res);
    else updateRecord(req, res);
  },

  getUserList: (req: Request, res: Response): void => {
    User.find((err: any, docs: any) => {
      if (!err) {
        res.render('/list', {
          list: docs,
        });
      } else {
        console.log('Error in retrieving user list :' + err);
      }
    });
  },

  updateUser: (req: Request, res: Response): void => {
    User.findById(req.params.id, (err: any, doc: any) => {
      if (!err) {
        res.render('/addOrEdit', {
          viewTitle: 'Update User',
          user: doc,
        });
      }
    });
  },

  deleteUser: (req: Request, res: Response): void => {
    User.findByIdAndRemove(req.params.id, undefined, (err: any) => {
      if (!err) {
        res.redirect('/list');
      } else {
        console.log('Error in user delete :' + err);
      }
    });
  },
};

const isUserRequest: (
  req: Request | UserRequest,
) => asserts req is UserRequest = (req: Request | UserRequest) => {
  if ('user' in req) {
    return;
  }
  throw new Error('this is not user request');
};

function insertRecord(req: Request, res: Response) {
  const user = new User();
  // user.fullName = req.body.fullName;
  // user.email = req.body.email;
  // user.mobile = req.body.mobile;
  user.save((err: any) => {
    if (!err) res.redirect('/list');
    else {
      if (err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render('user/addOrEdit', {
          viewTitle: 'Insert User',
          user: req.body,
        });
      } else console.log('Error during record insertion : ' + err);
    }
  });
}

function updateRecord(req: Request, res: Response) {
  User.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err: any) => {
      if (!err) {
        res.redirect('/list');
      } else {
        if (err.name == 'ValidationError') {
          handleValidationError(err, req.body);
          res.render('user/addOrEdit', {
            viewTitle: 'Update User',
            user: req.body,
          });
        } else console.log('Error during record update : ' + err);
      }
    },
  );
}

function handleValidationError(err: any, body: { [x: string]: any }) {
  for (const field in err.errors) {
    switch (err.errors[field].path) {
      case 'fullName':
        body['fullNameError'] = err.errors[field].message;
        break;
      case 'email':
        body['emailError'] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}
