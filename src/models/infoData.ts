import mongoose from 'mongoose';

export interface info {
  PatientInformation_patientID: number;
  PatientInformation_age: number;
  PatientInformation_firstName: string;
  PatientInformation_lastName: string;
  PatientInformation_gender: string;
  PatientInformation_arrivalDate: string;
  PatientInformation_clearDate: string | null;
  PatientInformation_lastDate: string | null;
  PatientInformation_firstDate: string | null;
  PatientInformation_onset: string;
  ChiefComplaint_timeCourse: string;
  ChiefComplaint_symptoms_alterationOfConsciousness: boolean;
  ChiefComplaint_symptoms_facialWeakness: boolean;
  ChiefComplaint_symptoms_facialWeaknessLeft: boolean;
  ChiefComplaint_symptoms_facialWeaknessRight: boolean;
  ChiefComplaint_symptoms_hemiparesis: boolean;
  ChiefComplaint_symptoms_hemiparesisLeft: boolean;
  ChiefComplaint_symptoms_hemiparesisRight: boolean;
  ChiefComplaint_symptoms_hemiparesthesia: boolean;
  ChiefComplaint_symptoms_hemiparesthesiaLeft: boolean;
  ChiefComplaint_symptoms_hemiparesthesiaRight: boolean;
  ChiefComplaint_symptoms_dysarthria: boolean;
  ChiefComplaint_symptoms_aphasia: boolean;
  ChiefComplaint_symptoms_ataxia: boolean;
  ChiefComplaint_symptoms_vertigo: boolean;
  ChiefComplaint_symptoms_visualProblem: boolean;
  ChiefComplaint_symptoms_other: boolean;
  ChiefComplaint_symptoms_otherText: string;
  UnderLyingDisease_deny: boolean;
  UnderLyingDisease_hx: boolean;
  UnderLyingDisease_previousTia: boolean;
  UnderLyingDisease_previousStroke: boolean;
  UnderLyingDisease_ht: boolean;
  UnderLyingDisease_dm: boolean;
  UnderLyingDisease_dlp: boolean;
  UnderLyingDisease_valvularHeartDisease: boolean;
  UnderLyingDisease_af: boolean;
  UnderLyingDisease_coronaryHeartDisease: boolean;
  UnderLyingDisease_ckd: boolean;
  UnderLyingDisease_peripheralArterialDisease: boolean;
  UnderLyingDisease_obesity: boolean;
  UnderLyingDisease_smoking: boolean;
  UnderLyingDisease_other: boolean;
  UnderLyingDisease_otherText: string;
  VitalSigns_systolicBP: number;
  VitalSigns_diastolicBP: number;
  VitalSigns_heartRate: number;
  VitalSigns_buttonHeartRate: string;
  EKG12Leads: string;
  NIHSS_levelOfConsciousness: string;
  NIHSS_twoQuestions: string;
  NIHSS_twoCommands: string;
  NIHSS_bestGaze: string;
  NIHSS_bestVisual: string;
  NIHSS_facialPalsy: string;
  NIHSS_bestMotorLeftArm: string;
  NIHSS_bestMotorRightArm: string;
  NIHSS_bestMotorLeftLeg: string;
  NIHSS_bestMotorRightLeg: string;
  NIHSS_limbAtaxia: string;
  NIHSS_sensory: string;
  NIHSS_bestLanguageAphasia: string;
  NIHSS_dysarthria: string;
  NIHSS_extinctionOrNeglect: string;
}

export interface infoDb extends info {
  author: string;
  filePath: Array<string>;
  testID: number;
}

export interface infoDbOut extends infoDb {
  addDate: string;
}

const infoSchema = new mongoose.Schema({
  PatientInformation_patientID: { type: Number, required: true },
  PatientInformation_age: { type: Number, required: true },
  PatientInformation_firstName: { type: String, required: true },
  PatientInformation_lastName: { type: String, required: true },
  PatientInformation_gender: { type: String, required: true },
  PatientInformation_arrivalDate: { type: String, required: true },
  PatientInformation_clearDate: { type: String, default: null },
  PatientInformation_lastDate: { type: String, default: null },
  PatientInformation_firstDate: { type: String, default: null },
  PatientInformation_onset: { type: String, required: true },
  ChiefComplaint_timeCourse: { type: String, required: true },
  ChiefComplaint_symptoms_alterationOfConsciousness: {
    type: Boolean,
    required: true,
  },
  ChiefComplaint_symptoms_facialWeakness: { type: Boolean, required: true },
  ChiefComplaint_symptoms_facialWeaknessLeft: { type: Boolean, required: true },
  ChiefComplaint_symptoms_facialWeaknessRight: {
    type: Boolean,
    required: true,
  },
  ChiefComplaint_symptoms_hemiparesis: { type: Boolean, required: true },
  ChiefComplaint_symptoms_hemiparesisLeft: { type: Boolean, required: true },
  ChiefComplaint_symptoms_hemiparesisRight: { type: Boolean, required: true },
  ChiefComplaint_symptoms_hemiparesthesia: { type: Boolean, required: true },
  ChiefComplaint_symptoms_hemiparesthesiaLeft: {
    type: Boolean,
    required: true,
  },
  ChiefComplaint_symptoms_hemiparesthesiaRight: {
    type: Boolean,
    required: true,
  },
  ChiefComplaint_symptoms_dysarthria: { type: Boolean, required: true },
  ChiefComplaint_symptoms_aphasia: { type: Boolean, required: true },
  ChiefComplaint_symptoms_ataxia: { type: Boolean, required: true },
  ChiefComplaint_symptoms_vertigo: { type: Boolean, required: true },
  ChiefComplaint_symptoms_visualProblem: { type: Boolean, required: true },
  ChiefComplaint_symptoms_other: { type: Boolean, required: true },
  ChiefComplaint_symptoms_otherText: { type: String, default: '' },
  UnderLyingDisease_deny: { type: Boolean, required: true },
  UnderLyingDisease_hx: { type: Boolean, required: true },
  UnderLyingDisease_previousTia: { type: Boolean, required: true },
  UnderLyingDisease_previousStroke: { type: Boolean, required: true },
  UnderLyingDisease_ht: { type: Boolean, required: true },
  UnderLyingDisease_dm: { type: Boolean, required: true },
  UnderLyingDisease_dlp: { type: Boolean, required: true },
  UnderLyingDisease_valvularHeartDisease: { type: Boolean, required: true },
  UnderLyingDisease_af: { type: Boolean, required: true },
  UnderLyingDisease_coronaryHeartDisease: { type: Boolean, required: true },
  UnderLyingDisease_ckd: { type: Boolean, required: true },
  UnderLyingDisease_peripheralArterialDisease: {
    type: Boolean,
    required: true,
  },
  UnderLyingDisease_obesity: { type: Boolean, required: true },
  UnderLyingDisease_smoking: { type: Boolean, required: true },
  UnderLyingDisease_other: { type: Boolean, required: true },
  UnderLyingDisease_otherText: { type: String, default: '' },
  VitalSigns_systolicBP: { type: Number, required: true },
  VitalSigns_diastolicBP: { type: Number, required: true },
  VitalSigns_heartRate: { type: Number, required: true },
  VitalSigns_buttonHeartRate: { type: String, required: true },
  EKG12Leads: { type: String, required: true },
  NIHSS_levelOfConsciousness: { type: String, required: true },
  NIHSS_twoQuestions: { type: String, required: true },
  NIHSS_twoCommands: { type: String, required: true },
  NIHSS_bestGaze: { type: String, required: true },
  NIHSS_bestVisual: { type: String, required: true },
  NIHSS_facialPalsy: { type: String, required: true },
  NIHSS_bestMotorLeftArm: { type: String, required: true },
  NIHSS_bestMotorRightArm: { type: String, required: true },
  NIHSS_bestMotorLeftLeg: { type: String, required: true },
  NIHSS_bestMotorRightLeg: { type: String, required: true },
  NIHSS_limbAtaxia: { type: String, required: true },
  NIHSS_sensory: { type: String, required: true },
  NIHSS_bestLanguageAphasia: { type: String, required: true },
  NIHSS_dysarthria: { type: String, required: true },
  NIHSS_extinctionOrNeglect: { type: String, required: true },
  addDate: { type: Date, default: Date.now() },
  author: { type: String, required: true },
  filePath: { type: Array, of: String, required: true },
  testID: { type: Number, required: true },
});

export default mongoose.model('information', infoSchema);
