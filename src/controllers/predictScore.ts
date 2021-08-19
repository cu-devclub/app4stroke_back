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
  max_ct_score: Joi.number().required(),
  age: Joi.number().required(),
  arrival_date: Joi.string().required(),
  arrival_time: Joi.string().required(),
  onset: Joi.string().required(),
  clear_onset_date: Joi.string().required(),
  clear_onset_time: Joi.string().required(),
  lsn_date: Joi.string().required(),
  lsn_time: Joi.string().required(),
  fsa_date: Joi.string().required(),
  fsa_time: Joi.string().required(),
  time_course: Joi.string().required(),
  cc_alter_cons: Joi.boolean().required(),
  cc_facial_weak: Joi.boolean().required(),
  cc_facial_weak_left: Joi.boolean().required(),
  cc_facial_weak_right: Joi.boolean().required(),
  cc_hemiparesis: Joi.boolean().required(),
  cc_hemiparesis_left: Joi.boolean().required(),
  cc_hemiparesis_right: Joi.boolean().required(),
  cc_hemiparesthesia: Joi.boolean().required(),
  cc_hemiparesthesia_left: Joi.boolean().required(),
  cc_hemiparesthesia_right: Joi.boolean().required(),
  cc_dysarthria: Joi.boolean().required(),
  cc_aphasia: Joi.boolean().required(),
  cc_ataxia: Joi.boolean().required(),
  cc_vertigo: Joi.boolean().required(),
  cc_visual: Joi.boolean().required(),
  cc_others: Joi.boolean().required(),
  cc_others_text: Joi.boolean().required(),
  ud_deny_ud: Joi.boolean().required(),
  ud_hx_tia: Joi.boolean().required(),
  ud_prev_tia: Joi.boolean().required(),
  ud_prev_stroke: Joi.boolean().required(),
  ud_ht: Joi.boolean().required(),
  ud_dm: Joi.boolean().required(),
  ud_dlp: Joi.boolean().required(),
  ud_valvular_hd: Joi.boolean().required(),
  ud_af: Joi.boolean().required(),
  ud_coronary_hd: Joi.boolean().required(),
  ud_ckd: Joi.boolean().required(),
  ud_peripheral_ad: Joi.boolean().required(),
  ud_obesity: Joi.boolean().required(),
  ud_smoking: Joi.boolean().required(),
  ud_others: Joi.boolean().required(),
  ud_others_text: Joi.string().required(),
  systolic_bp: Joi.number().required(),
  diastolic_bp: Joi.number().required(),
  nihss_1a: Joi.number().required(),
  nihss_1b: Joi.number().required(),
  nihss_1c: Joi.number().required(),
  nihss_2: Joi.number().required(),
  nihss_3: Joi.number().required(),
  nihss_4: Joi.number().required(),
  nihss_5a: Joi.number().required(),
  nihss_5b: Joi.number().required(),
  nihss_6a: Joi.number().required(),
  nihss_6b: Joi.number().required(),
  nihss_7: Joi.number().required(),
  nihss_8: Joi.number().required(),
  nihss_9: Joi.number().required(),
  nihss_10: Joi.number().required(),
  nihss_11: Joi.number().required(),
});

const PredictScore = async (req: Request, res: Response) => {
  try {
    const data = await predictScoreRequestDataSchema.validateAsync(req.body);
    const postPredictScore = await axios({ ...config, data: data });

    res.json(postPredictScore.data);
  } catch (e: any) {
    if (e.response) {
      console.log('response', e.response);
    } else if (e.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log('request', e.request);
    } else {
      // Something happened in setting up the request that triggered an Error
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

export default PredictScore;
