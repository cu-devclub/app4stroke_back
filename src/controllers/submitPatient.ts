import axios from 'axios';
import { Request, Response } from 'express';
import Joi from 'joi';
import httpError from '../errorHandler/httpError/httpError';
import mapFrontToMl from '../middlewares/mapFrontToMl';
import { insertFront } from '../middlewares/patient';
import { insertPredict, updatePredict } from '../middlewares/predict';

const frontDataSchema = Joi.object({
  PatientInformation: Joi.object({
    patientID: Joi.any().required(),
    age: Joi.number().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.string().required(),
    arrivalDate: Joi.string().required(),
    arrivalTime: Joi.string().required(),
    onset: Joi.string().required(),
    clearDate: Joi.string().required(),
    clearTime: Joi.string().required(),
    lastDate: Joi.string().required(),
    lastTime: Joi.string().required(),
    firstDate: Joi.string().required(),
    firstTime: Joi.string().required(),
  }).required(),
  ChiefComplaint: Joi.object({
    timeCourse: Joi.string().required(),
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
    otherText: Joi.string().required(),
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
    otherText: Joi.string().required(),
  }).required(),
  VitalSigns: Joi.object({
    systolicBP: Joi.number().required(),
    diastolicBP: Joi.number().required(),
    heartRate: Joi.number().required(),
    buttonHeartRate: Joi.string().required(),
  }).required(),
  EKG12Leads: Joi.string().required(),
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
    const upload = await axios({ url: '/api/files/upload', data: req.files });
    const patient = await insertFront('Author', data, upload.data.url);
    const mlAnalyse = await axios({ url: '/', data: [upload.data.url] });
    const predict = await insertPredict(patient.data.testID);
    const mlPredict = await axios({
      url: '/',
      data: {
        ...mapFrontToMl(req.body),
        max_ct_score: mlAnalyse.data.max_ct_score,
      },
    });
    const updatePredictCollect = await updatePredict(
      patient.data.testID,
      mlPredict.data,
    );
  } catch (e: any) {
    if (e.response) {
      console.log('response', e.response);
    } else if (e.request) {
      console.log('request', e.request);
    } else {
      console.log('Error', e.message);
    }

    if (e.code === 'ECONNREFUSED') {
      res.status(500).send(httpError(500, e.message));
    } else if (e.name == 'ValidationError') {
      res.status(400).send(httpError(400, e.details[0].message));
    } else {
      res.status(0).send('Unknown Error');
    }
  }
};

export default submitPatient;
