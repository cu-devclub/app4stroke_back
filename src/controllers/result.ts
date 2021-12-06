import { Request, Response } from 'express';
import BaseError from '../errorHandler/httpError/Component/baseError';
import httpError from '../errorHandler/httpError/httpError';
import auth from '../middlewares/auth';
import { findInfo } from '../middlewares/patient';
import { findPredict } from '../middlewares/predict';
import { infoDbOut } from '../models/infoData';

const result = async (req: Request, res: Response) => {
  const authResult = await auth(req, res);
  if (!authResult) {
    return;
  }
  try {
    const infos = await findInfo({});
    const predicts = await findPredict({});
    if (infos.length !== predicts.length) {
      throw httpError(
        500,
        'DB: error length of information not equal length of predict',
      );
    }
    const merge = infos.map((info: infoDbOut, index: number) => ({
      sameID: info.testID === predicts[index].testID,
      testID: info.testID,
      date: info.addDate,
      patientID: info.PatientInformation_patientID,
      firstName: info.PatientInformation_firstName,
      lastName: info.PatientInformation_lastName,
      age: info.PatientInformation_age,
      prob: predicts[index].prob,
    }));
    res.send({
      statusCode: 200,
      statusText: 'SUCCESS',
      description: 'here your response',
      data: merge,
      // information: await findInfo(),
    });
  } catch (e: any) {
    if (e.response) {
      console.log(e.response.data);
      console.log(e.response.status);
      console.log(e.response.headers);
      res
        .status(500)
        .send(httpError(500, `server receive response error : ${e}`));
    } else if (e.request) {
      res.status(500).send(httpError(500, `server can't request : ${e}`));
      console.log(e.request);
    } else if (e instanceof BaseError) {
      res.status(e.statusCode).send(e);
    } else {
      res.status(500).json({
        status: 'unknow',
        error: e,
      });
    }
  }
};

export default result;
