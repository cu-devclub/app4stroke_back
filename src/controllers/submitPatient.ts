import axios from 'axios';
import { Request, Response } from 'express';
import Joi from 'joi';
import httpError from '../errorHandler/httpError/httpError';
import mapFrontToMl from '../middlewares/mapFrontToMl';
import { insertInfo } from '../middlewares/patient';
import { insertPredict, updatePredict } from '../middlewares/predict';
import BaseError from '../errorHandler/httpError/Component/baseError';

const frontDataSchema = Joi.object({
  PatientInformation: Joi.object({
    patientID: Joi.number().required(),
    age: Joi.number().required(),
    firstName: Joi.string().required().allow(''),
    lastName: Joi.string().required().allow(''),
    gender: Joi.string().required().allow(''),
    arrivalDate: Joi.string().required().allow(''),
    arrivalTime: Joi.string().required().allow(''),
    onset: Joi.string().required().allow(''),
    clearDate: Joi.string().required().allow(''),
    clearTime: Joi.string().required().allow(''),
    lastDate: Joi.string().required().allow(''),
    lastTime: Joi.string().required().allow(''),
    firstDate: Joi.string().required().allow(''),
    firstTime: Joi.string().required().allow(''),
  }).required(),
  ChiefComplaint: Joi.object({
    timeCourse: Joi.string().required().allow(''),
    alterationOfConsciousness: Joi.boolean().required(),
    facialWeakness: Joi.boolean().required(),
    facialWeaknessLeft: Joi.boolean().required(),
    facialWeaknessRight: Joi.boolean().required(),
    hemiparesis: Joi.boolean().required(),
    hemiparesisLeft: Joi.boolean().required(),
    hemiparesisRight: Joi.boolean().required(),
    hemiparesthesia: Joi.boolean().required(),
    hemiparesthesiaLeft: Joi.boolean().required(),
    hemiparesthesiaRight: Joi.boolean().required(),
    dysarthria: Joi.boolean().required(),
    aphasia: Joi.boolean().required(),
    ataxia: Joi.boolean().required(),
    vertigo: Joi.boolean().required(),
    visualProblem: Joi.boolean().required(),
    other: Joi.boolean().required(),
    otherText: Joi.string().required().allow(''),
  }).required(),
  Underlying: Joi.object({
    deny: Joi.boolean().required(),
    hx: Joi.boolean().required(),
    previousTia: Joi.boolean().required(),
    previousStroke: Joi.boolean().required(),
    ht: Joi.boolean().required(),
    dm: Joi.boolean().required(),
    dlp: Joi.boolean().required(),
    valvularHeartDisease: Joi.boolean().required(),
    af: Joi.boolean().required(),
    coronaryHeartDisease: Joi.boolean().required(),
    ckd: Joi.boolean().required(),
    peripheralArterialDisease: Joi.boolean().required(),
    obesity: Joi.boolean().required(),
    smoking: Joi.boolean().required(),
    other: Joi.boolean().required(),
    otherText: Joi.string().required().allow(''),
  }).required(),
  VitalSigns: Joi.object({
    systolicBP: Joi.number().required(),
    diastolicBP: Joi.number().required(),
    heartRate: Joi.number().required(),
    buttonHeartRate: Joi.string().required().allow(''),
  }).required(),
  EKG12Leads: Joi.string().required().allow(''),
  NIHSS: Joi.object({
    levelOfConsciousness: Joi.number().required(),
    twoQuestions: Joi.number().required(),
    twoCommands: Joi.number().required(),
    bestGaze: Joi.number().required(),
    bestVisual: Joi.number().required(),
    facialPalsy: Joi.number().required(),
    bestMotorLeftArm: Joi.number().required(),
    bestMotorRightArm: Joi.number().required(),
    bestMotorLeftLeg: Joi.number().required(),
    bestMotorRightLeg: Joi.number().required(),
    limbAtaxia: Joi.number().required(),
    sensory: Joi.number().required(),
    bestLanguageAphasia: Joi.number().required(),
    dysarthria: Joi.number().required(),
    extinctionOrNeglect: Joi.number().required(),
  }).required(),
});

const submitPatient = async (req: Request, res: Response) => {
  try {
    const data = await frontDataSchema.validateAsync(req.body);

    const path: Array<string> = [];
    if (req.files && req.files instanceof Array) {
      req.files.forEach(async (file) => {
        const upload = await axios({
          headers: {
            Authorization:
              'Bearer ya29.c.KqYBDgg829Qewovd64HMm5d7eeY_u-aO-4Vwfsi4ClGhqVDuP_4tLFxJqtROk7Ou1gLuyR3bzAbniNPYt7VN8fYd3WG4lGRlmz71b27fMqgeRNfP0PqU9u7ahPdPDlRcUT23tje3E7kbkS1smMJ_p7iyKW07cFvrragGe7Z4haiYaXxGyI1xBAq3BldNPZYpPkkovmGUyKnXUmLgQtwmFxYf9fUN5bahLA',
            'Content-Type': 'multipart/form-data',
          },
          url: 'http://localhost:3000/api/files/upload',
          data: {
            file: file.buffer,
          },
          method: 'post',
        });

        path.push(upload.data.path);
      });
    } else {
      throw httpError(400, 'please upload file;\n file is required');
    }

    const patient = await insertInfo('Author', data, path);
    const predict = await insertPredict(patient.data.testID);

    const mlAnalyse = await axios({
      headers: {
        'Content-Type': 'application/json',
      },
      url: 'http://13.229.148.14:9898/api/analyse_dicom/',
      data: {
        dicom_paths: path,
      },
      method: 'POST',
    });

    const mlPredict = await axios({
      headers: {
        'Content-Type': 'application/json',
      },
      url: 'http://13.229.148.14:9898/api/predict_prob/',
      data: {
        ...mapFrontToMl(req.body),
        max_ct_score: mlAnalyse.data.max_ct_score,
      },
      method: 'POST',
    });

    await updatePredict(patient.data.testID, mlPredict.data);

    res.status(200).send({
      statusCode: 200,
      statusText: 'SUCCESS',
      description: 'submit success',
      data: {
        request: patient,
        predict: predict,
      },
    });
  } catch (e: any) {
    if (e instanceof BaseError) {
      res.status(e.statusCode).send(e);
    } else if (e instanceof Joi.ValidationError) {
      res.status(400).send(httpError(400, `${e.name}:${e.message}`));
    }
    // if (e.code === 'ECONNREFUSED') {
    //   res.status(500).send(httpError(500, e.message));
    // } else if (e.name == 'ValidationError') {
    //   res.status(400).send(httpError(400, e.details[0].message));
    // } else {
    //   res.status(0).send('Unknown Error');
    // }
  }
};

export default submitPatient;
