import Joi from 'joi';
import axios, { AxiosRequestConfig } from 'axios';
import { Request, Response } from 'express';
import httpError from '../errorHandler/httpError/httpError';

const config: AxiosRequestConfig = {
  method: 'post',
  url: '/',
  headers: {
    'Content-Type': 'application/json',
  },
};

const predictScoreRequestDataSchema = Joi.object({
  max_ct_score: Joi.number(),
  age: Joi.number(),
  arrival_date: Joi.string(),
  arrival_time: Joi.string(),
  onset: Joi.string(),
  clear_onset_date: Joi.string(),
  clear_onset_time: Joi.string(),
  lsn_date: Joi.string(),
  lsn_time: Joi.string(),
  fsa_date: Joi.string(),
  fsa_time: Joi.string(),
  time_course: Joi.string(),
  cc_alter_cons: Joi.boolean(),
  cc_facial_weak: Joi.boolean(),
  cc_facial_weak_left: Joi.boolean(),
  cc_facial_weak_right: Joi.boolean(),
  cc_hemiparesis: Joi.boolean(),
  cc_hemiparesis_left: Joi.boolean(),
  cc_hemiparesis_right: Joi.boolean(),
  cc_hemiparesthesia: Joi.boolean(),
  cc_hemiparesthesia_left: Joi.boolean(),
  cc_hemiparesthesia_right: Joi.boolean(),
  cc_dysarthria: Joi.boolean(),
  cc_aphasia: Joi.boolean(),
  cc_ataxia: Joi.boolean(),
  cc_vertigo: Joi.boolean(),
  cc_visual: Joi.boolean(),
  cc_others: Joi.boolean(),
  cc_others_text: Joi.boolean(),
  ud_deny_ud: Joi.boolean(),
  ud_hx_tia: Joi.boolean(),
  ud_prev_tia: Joi.boolean(),
  ud_prev_stroke: Joi.boolean(),
  ud_ht: Joi.boolean(),
  ud_dm: Joi.boolean(),
  ud_dlp: Joi.boolean(),
  ud_valvular_hd: Joi.boolean(),
  ud_af: Joi.boolean(),
  ud_coronary_hd: Joi.boolean(),
  ud_ckd: Joi.boolean(),
  ud_peripheral_ad: Joi.boolean(),
  ud_obesity: Joi.boolean(),
  ud_smoking: Joi.boolean(),
  ud_others: Joi.boolean(),
  ud_others_text: Joi.string(),
  systolic_bp: Joi.number(),
  diastolic_bp: Joi.number(),
  nihss_1a: Joi.number(),
  nihss_1b: Joi.number(),
  nihss_1c: Joi.number(),
  nihss_2: Joi.number(),
  nihss_3: Joi.number(),
  nihss_4: Joi.number(),
  nihss_5a: Joi.number(),
  nihss_5b: Joi.number(),
  nihss_6a: Joi.number(),
  nihss_6b: Joi.number(),
  nihss_7: Joi.number(),
  nihss_8: Joi.number(),
  nihss_9: Joi.number(),
  nihss_10: Joi.number(),
  nihss_11: Joi.number(),
});

const PredictScore = async (req: Request, res: Response) => {
  try {
    const data = await predictScoreRequestDataSchema.validateAsync(req.body);
    const postPredictScore = await axios({ ...config, data: data });

    res.json(postPredictScore.data);
  } catch (e: any) {
    if (e.code === 'ECONNREFUSED') {
      res.status(500).send(httpError(500, e.message));
    } else if (e.name == 'ValidationError') {
      res.status(400).send(httpError(400, e.details[0].message));
    } else {
      res.status(0).send('Unknown Error');
    }
  }
};

export default PredictScore;
