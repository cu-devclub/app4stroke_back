import { Request, Response } from 'express';
import Joi from 'joi';
import BaseError from '../errorHandler/httpError/Component/baseError';
import httpError from '../errorHandler/httpError/httpError';
import { findInfo } from '../middlewares/patient';
import { findPredict } from '../middlewares/predict';

const schema = Joi.object({
  id: Joi.number().required(),
});

const view = async (req: Request, res: Response) => {
  try {
    const data = await schema.validateAsync(req.params);

    const info = await findInfo(data.id);
    const predict = await findPredict(data.id);
    res.status(200).send({
      data: {
        information: info,
        prediction: predict,
      },
    });
  } catch (e: any) {
    if (e instanceof BaseError) {
      res.status(e.statusCode).send(e);
    } else if (e instanceof Joi.ValidationError) {
      res.status(400).send(httpError(400, `${e.name}:${e.message}`));
    }
  }
};

export default view;
