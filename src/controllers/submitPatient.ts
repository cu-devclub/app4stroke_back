import axios from 'axios';
import { Request, Response } from 'express';
import Joi from 'joi';
import httpError from '../errorHandler/httpError/httpError';
import mapFrontToMl from '../middlewares/mapFrontToMl';
import BaseError from '../errorHandler/httpError/Component/baseError';
import base64toImg from '../middlewares/base64toImg';
import storage from '../config/storage';
import submitStatusObj from '../errorHandler/processError/Component/submitStatusObj';
import precessError from '../errorHandler/processError/precessError';
import auth from '../middlewares/auth';
import { findInfo, insertInfo, updateInfo } from '../middlewares/information';
import { info } from '../models/infoData';
import { countRecord, findRecord, insertRecord } from '../middlewares/record';

const informationDataSchema = Joi.object({
  testID: Joi.number().required().allow(null),
  PatientInformation_patientID: Joi.number().required(),
  PatientInformation_age: Joi.number().required(),
  PatientInformation_firstName: Joi.string().required(),
  PatientInformation_lastName: Joi.string().required(),
  PatientInformation_gender: Joi.string().required(),
  PatientInformation_arrivalDate: Joi.string().required(),
  PatientInformation_clearDate: Joi.string().required().allow(null),
  PatientInformation_lastDate: Joi.string().required().allow(null),
  PatientInformation_firstDate: Joi.string().required().allow(null),
  PatientInformation_onset: Joi.string().required(),
  ChiefComplaint_timeCourse: Joi.string().required(),
  ChiefComplaint_symptoms_alterationOfConsciousness: Joi.boolean().required(),
  ChiefComplaint_symptoms_facialWeakness: Joi.boolean().required(),
  ChiefComplaint_symptoms_facialWeaknessLeft: Joi.boolean().required(),
  ChiefComplaint_symptoms_facialWeaknessRight: Joi.boolean().required(),
  ChiefComplaint_symptoms_hemiparesis: Joi.boolean().required(),
  ChiefComplaint_symptoms_hemiparesisLeft: Joi.boolean().required(),
  ChiefComplaint_symptoms_hemiparesisRight: Joi.boolean().required(),
  ChiefComplaint_symptoms_hemiparesthesia: Joi.boolean().required(),
  ChiefComplaint_symptoms_hemiparesthesiaLeft: Joi.boolean().required(),
  ChiefComplaint_symptoms_hemiparesthesiaRight: Joi.boolean().required(),
  ChiefComplaint_symptoms_dysarthria: Joi.boolean().required(),
  ChiefComplaint_symptoms_aphasia: Joi.boolean().required(),
  ChiefComplaint_symptoms_ataxia: Joi.boolean().required(),
  ChiefComplaint_symptoms_vertigo: Joi.boolean().required(),
  ChiefComplaint_symptoms_visualProblem: Joi.boolean().required(),
  ChiefComplaint_symptoms_other: Joi.boolean().required(),
  ChiefComplaint_symptoms_otherText: Joi.string().required().allow(''),
  UnderLyingDisease_deny: Joi.boolean().required(),
  UnderLyingDisease_hx: Joi.boolean().required(),
  UnderLyingDisease_previousTia: Joi.boolean().required(),
  UnderLyingDisease_previousStroke: Joi.boolean().required(),
  UnderLyingDisease_ht: Joi.boolean().required(),
  UnderLyingDisease_dm: Joi.boolean().required(),
  UnderLyingDisease_dlp: Joi.boolean().required(),
  UnderLyingDisease_valvularHeartDisease: Joi.boolean().required(),
  UnderLyingDisease_af: Joi.boolean().required(),
  UnderLyingDisease_coronaryHeartDisease: Joi.boolean().required(),
  UnderLyingDisease_ckd: Joi.boolean().required(),
  UnderLyingDisease_peripheralArterialDisease: Joi.boolean().required(),
  UnderLyingDisease_obesity: Joi.boolean().required(),
  UnderLyingDisease_smoking: Joi.boolean().required(),
  UnderLyingDisease_other: Joi.boolean().required(),
  UnderLyingDisease_otherText: Joi.string().required().allow(''),
  VitalSigns_systolicBP: Joi.number().required(),
  VitalSigns_diastolicBP: Joi.number().required(),
  VitalSigns_heartRate: Joi.number().required(),
  VitalSigns_buttonHeartRate: Joi.string().required(),
  EKG12Leads: Joi.string().required(),
  NIHSS_levelOfConsciousness: Joi.string().required(),
  NIHSS_twoQuestions: Joi.string().required(),
  NIHSS_twoCommands: Joi.string().required(),
  NIHSS_bestGaze: Joi.string().required(),
  NIHSS_bestVisual: Joi.string().required(),
  NIHSS_facialPalsy: Joi.string().required(),
  NIHSS_bestMotorLeftArm: Joi.string().required(),
  NIHSS_bestMotorRightArm: Joi.string().required(),
  NIHSS_bestMotorLeftLeg: Joi.string().required(),
  NIHSS_bestMotorRightLeg: Joi.string().required(),
  NIHSS_limbAtaxia: Joi.string().required(),
  NIHSS_sensory: Joi.string().required(),
  NIHSS_bestLanguageAphasia: Joi.string().required(),
  NIHSS_dysarthria: Joi.string().required(),
  NIHSS_extinctionOrNeglect: Joi.string().required(),
});

const submitPatient = async (req: Request, res: Response) => {
  const authResult = await auth(req, res);
  if (!authResult) {
    return;
  }
  for (let property in req.body) {
    if (req.body[property] == 'null') {
      req.body[property] = null;
    }
  }

  const processStatus: submitStatusObj = {
    isInsertedInfo: false,
    isInsertedPredict: false,
    testID: null,
    isUploaded: false,
    uploadID: null,
  };

  try {
    // validate incoming request body
    const data = <info>await informationDataSchema.validateAsync(req.body);

    // Loop upload and append path to const path
    // check file as array;
    const RecordCount = await countRecord();

    if (RecordCount instanceof BaseError) {
      throw RecordCount;
    }

    const _path = await Promise.all(
      (<Express.Multer.File[]>req.files).map(async (file, count) => {
        let upload = await storage.upload(
          file.buffer,
          `record/${RecordCount + 1}/upload/`,
          `${count}`,
        );

        if (!upload.success) {
          throw httpError(500, `Error: Can't upload file`);
        }
        if (typeof upload.uri === 'string') {
          return upload.uri;
        }
      }),
    );
    processStatus.uploadID = RecordCount + 1;
    processStatus.isUploaded = true;

    const path = _path.filter((ele): ele is string => typeof ele === 'string');

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

    const imgPath = await Promise.all(
      mlAnalyse.data.img_bytes.map(
        async (byte: string, n: string) =>
          (
            await storage.upload(
              base64toImg(byte),
              `record/${RecordCount + 1}/img`,
              n,
            )
          ).path,
      ),
    );

    const heatmapPath = await Promise.all(
      mlAnalyse.data.heatmap_bytes.map(
        async (byte: string, n: string) =>
          (
            await storage.upload(
              base64toImg(byte),
              `record/${RecordCount + 1}/heatMap`,
              n,
            )
          ).path,
      ),
    );

    // Insert template data to DB
    const patient = data.testID
      ? await updateInfo(data.testID, { recordID: RecordCount + 1, ...data })
      : await insertInfo({
          ...data,
          author: authResult.username,
          recordID: RecordCount + 1,
          file_path: path,
        });
    if (patient instanceof BaseError) {
      throw patient;
    } else {
      processStatus.isInsertedInfo = true;
    }

    const record = await insertRecord({
      ...mlPredict.data,
      total_slices: mlAnalyse.data.total_slices,
      max_score_slice: mlAnalyse.data.max_score_slice,
      max_ct_score: mlAnalyse.data.max_ct_score,
      img_path: imgPath,
      heatmap_path: heatmapPath,
      ct_score: mlAnalyse.data.ct_scores,
    });
    processStatus.isInsertedPredict = true;
    processStatus.testID = data.testID ? data.testID : patient.testID;

    // If insert error
    if (patient instanceof BaseError) {
      throw patient;
    } else if (record instanceof BaseError) {
      throw record;
    }

    res.status(200).send({
      statusCode: 200,
      statusText: 'SUCCESS',
      description: 'submit success',
      data: {
        information: await findInfo(data.testID ? data.testID : patient.testID),
        predict: await findRecord(RecordCount + 1),
      },
    });
  } catch (e: any) {
    await precessError(processStatus);
    console.log(e);
    if (e.request) {
      res.status(500).send(httpError(500, `server can't request : ${e}`));
      console.log(e.request);
    } else if (e instanceof Joi.ValidationError) {
      res.status(400).send(httpError(400, `${e.name}:${e.message}`));
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

export default submitPatient;
