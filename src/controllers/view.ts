import { Request, Response } from 'express';
import Joi from 'joi';
import BaseError from '../errorHandler/httpError/Component/baseError';
import httpError from '../errorHandler/httpError/httpError';
import auth from '../middlewares/auth';
import { findInfo } from '../middlewares/patient';
import { findPredict } from '../middlewares/predict';

const schema = Joi.object({
  id: Joi.number().required(),
});

const view = async (req: Request, res: Response) => {
  auth(req, res);
  try {
    const data = await schema.validateAsync(req.params);

    const info = await findInfo({ testID: data.id });
    const predict = await findPredict({ testID: data.id });
    res.status(200).send({
      data: {
        information: info,
        prediction: predict,
      },
    });
  } catch (e: any) {
    if (e instanceof BaseError) {
      res.status(e.statusCode).send(e);
    } else {
      res.status(500).json({
        status: 'unknow',
        error: e,
      });
    }
  }
};

export default view;
