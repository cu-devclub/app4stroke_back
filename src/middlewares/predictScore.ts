import Joi from 'joi';
import { Request, Response } from 'express';
import axios, { AxiosRequestConfig } from 'axios';
import httpError from '../errorHandler/httpError/httpError';

const dataFromFontSchema = Joi.object({
  PatientInformation: Joi.object({
    patientID: Joi.any().required(),
    age: Joi.number().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.string().required(),
    arrivalDate: Joi.string().required(),
    arrivalTime: Joi.string().required(),
    clearDate: Joi.string().required(),
    clearTime: Joi.string().required(),
    lastDate: Joi.string().required(),
    lastTime: Joi.string().required(),
    firstDate: Joi.string().required(),
    firstTime: Joi.string().required(),
    onset: Joi.string().required(),
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
    otherText: Joi.string(),
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
    otherText: Joi.string(),
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

const mapFrontToMl = async (body: any) => {
  return {
    age: body.PatientInformation.age,
    arrival_date: body.PatientInformation.arrivalDate,
    arrival_time: body.PatientInformation.arrivalTime,
    onset: body.PatientInformation.onset,
    clear_onset_date: body.PatientInformation.clearDate,
    clear_onset_time: body.PatientInformation.clearTime,
    lsn_date: body.PatientInformation.lastDate,
    lsn_time: body.PatientInformation.lastTime,
    fsa_date: body.PatientInformation.firstDate,
    fsa_time: body.PatientInformation.firstTime,
    time_course: body.ChiefComplaint.timeCourse,
    cc_alter_cons: body.ChiefComplaint.alterationOfConsciousness,
    cc_facial_weak: body.ChiefComplaint.facialWeakness,
    cc_facial_weak_left: body.ChiefComplaint.facialWeaknessLeft,
    cc_facial_weak_right: body.ChiefComplaint.facialWeaknessRight,
    cc_hemiparesis: body.ChiefComplaint.hemiparesis,
    cc_hemiparesis_left: body.ChiefComplaint.hemiparesisLeft,
    cc_hemiparesis_right: body.ChiefComplaint.hemiparesisRight,
    cc_hemiparesthesia: body.ChiefComplaint.hemiparesthesia,
    cc_hemiparesthesia_left: body.ChiefComplaint.hemiparesthesiaLeft,
    cc_hemiparesthesia_right: body.ChiefComplaint.hemiparesthesiaRight,
    cc_dysarthria: body.ChiefComplaint.dysarthria,
    cc_aphasia: body.ChiefComplaint.aphasia,
    cc_ataxia: body.ChiefComplaint.ataxia,
    cc_vertigo: body.ChiefComplaint.vertigo,
    cc_visual: body.ChiefComplaint.visualProblem,
    cc_others: body.ChiefComplaint.other,
    cc_others_text: body.ChiefComplaint.otherText,
    ud_deny_ud: body.Underlying.deny,
    ud_hx_tia: body.Underlying.hx,
    ud_prev_tia: body.Underlying.previousTia,
    ud_prev_stroke: body.Underlying.previousStroke,
    ud_ht: body.Underlying.ht,
    ud_dm: body.Underlying.dm,
    ud_dlp: body.Underlying.dlp,
    ud_valvular_hd: body.Underlying.valvularHeartDisease,
    ud_af: body.Underlying.af,
    ud_coronary_hd: body.Underlying.coronaryHeartDisease,
    ud_ckd: body.Underlying.ckd,
    ud_peripheral_ad: body.Underlying.peripheralArterialDisease,
    ud_obesity: body.Underlying.obesity,
    ud_smoking: body.Underlying.smoking,
    ud_others: body.Underlying.other,
    ud_others_text: body.Underlying.otherText,
    systolic_bp: body.VitalSigns.systolicBP,
    diastolic_bp: body.VitalSigns.diastolicBP,
    nihss_1a: body.NIHSS.levelOfConsciousness,
    nihss_1b: body.NIHSS.twoQuestions,
    nihss_1c: body.NIHSS.twoCommands,
    nihss_2: body.NIHSS.bestGaze,
    nihss_3: body.NIHSS.bestVisual,
    nihss_4: body.NIHSS.facialPalsy,
    nihss_5a: body.NIHSS.bestMotorLeftArm,
    nihss_5b: body.NIHSS.bestMotorRightArm,
    nihss_6a: body.NIHSS.bestMotorLeftLeg,
    nihss_6b: body.NIHSS.bestMotorRightLeg,
    nihss_7: body.NIHSS.limbAtaxia,
    nihss_8: body.NIHSS.sensory,
    nihss_9: body.NIHSS.bestLanguageAphasia,
    nihss_10: body.NIHSS.dysarthria,
    nihss_11: body.NIHSS.extinctionOrNeglect,
  };
};

const config: AxiosRequestConfig = {
  method: 'post',
  url: '/',
  headers: {
    'Content-Type': 'application/json',
  },
};

const predictScore = async (req: Request, res: Response) => {
  try {
    const analyse = 
    const data = await dataFromFontSchema.validateAsync(req.body);
    const dataMlForm = await mapFrontToMl(data);
    const post = await axios({ ...config, data: dataMlForm });

    res.json(post.data);
  } catch (e: any) {
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
