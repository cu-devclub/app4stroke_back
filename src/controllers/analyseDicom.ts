import { Request, Response } from 'express';
import axios, { AxiosRequestConfig } from 'axios';
import Joi from 'joi';
import httpError from '../errorHandler/httpError/httpError';

const config: AxiosRequestConfig = {
  method: 'post',
  url: 'https://postman-echo.com/post',
  headers: {
    'Content-Type': 'application/json',
  },
};

const dicomSchema = Joi.array().items(Joi.string().required());

const analyseDicom = async (req: Request, res: Response) => {
  try {
    const data = await dicomSchema.validateAsync(Object.values(req.body));
    console.log(req.body);

    const post = await axios({ ...config, data });
    console.log(post.data);

    res.status(200).send(post.data);
  } catch (e: any) {
    console.log('Error');

    console.log(e);

    if (e.code === 'ECONNREFUSED') {
      res.status(500).send(httpError(500, e.message));
    } else if (e.name == 'ValidationError') {
      res.status(400).send(httpError(400, e.details[0].message));
    } else {
      res.status(0).send('Unknown Error');
    }
  }
};

export default analyseDicom;
