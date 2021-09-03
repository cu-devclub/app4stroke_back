import axios from 'axios';
import { Request, Response } from 'express';
import Joi from 'joi';
import httpError from '../errorHandler/httpError/httpError';
import mapFrontToMl from '../middlewares/mapFrontToMl';
import { insertInfo } from '../middlewares/patient';
import {
  findPredict,
  insertPredict,
  updatePredict,
} from '../middlewares/predict';
import BaseError from '../errorHandler/httpError/Component/baseError';
import base64toImg from '../middlewares/base64toImg';

const frontDataSchema = Joi.object({
  PatientInformation: Joi.object({
    patientID: Joi.number().required(),
    age: Joi.number().required(),
    firstName: Joi.string().required().allow(''),
    lastName: Joi.string().required().allow(''),
    gender: Joi.string().required().allow(''),
    arrivalDate: Joi.string().required().allow(''),
    // arrivalTime: Joi.string().required().allow(null),
    onset: Joi.string().required().allow(''),
    clearDate: Joi.string().required().allow(null),
    // clearTime: Joi.string().required().allow(null),
    lastDate: Joi.string().required().allow(null),
    // lastTime: Joi.string().required().allow(null),
    firstDate: Joi.string().required().allow(null),
    // firstTime: Joi.string().required().allow(null),
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
    // validate incoming request body
    const data = await frontDataSchema.validateAsync(req.body);

    // create const path collect path
    const path: Array<string> = [];

    // Loop upload and append path to const path
    // check file as array
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

    // Insert template data to DB
    const patient = await insertInfo('Author', data, path);
    const predict = await insertPredict(patient.data.testID);

    // If insert error
    if (patient instanceof BaseError) {
      throw patient;
    } else if (predict instanceof BaseError) {
      throw predict;
    }

    // POST to ML
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
        ...mapFrontToMl(data),
        max_ct_score: mlAnalyse.data.max_ct_score,
      },
      method: 'POST',
    });

    res.json(mlPredict);

    // TODO: base64 to img and upload to Cloud

    // mlAnalyse.data.heatmap_bytes.forEach((byte: string) => {
    //   upload(base64toImg(byte));
    // });

    // FIXME: path data
    await updatePredict(patient.data.testID, {
      ...mlPredict.data,
      total_slices: mlAnalyse.data.total_slices,
      max_score_slice: mlAnalyse.data.max_score_slice,
      max_ct_score: mlAnalyse.data.max_ct_score,
      imgPath: [],
      heatmapPath: [],
      ctScores: [],
    });

    res.status(200).send({
      statusCode: 200,
      statusText: 'SUCCESS',
      description: 'submit success',
      data: {
        information: patient.data,
        predict: await findPredict(patient.data.testID),
      },
    });
  } catch (e: any) {
    if (e instanceof BaseError) {
      res.status(e.statusCode).send(e);
    } else if (e instanceof Joi.ValidationError) {
      res.status(400).send(httpError(400, `${e.name}:${e.message}`));
    } else {
      res.json({
        status: 'unknow',
        error: e,
      });
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
