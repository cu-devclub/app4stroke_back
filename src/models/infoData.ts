import mongoose from 'mongoose';

export interface info {
  PatientInformation: {
    patientID: number;
    age: number;
    firstName: string;
    lastName: string;
    gender: string;
    arrivalDate: string;
    arrivalTime: string;
    clearDate: string;
    clearTime: string;
    lastDate: string;
    lastTime: string;
    firstDate: string;
    firstTime: string;
    onset: string;
  };
  ChiefComplaint: {
    timeCourse: string;
    alterationOfConsciousness: boolean;
    facialWeakness: boolean;
    facialWeaknessLeft: boolean;
    facialWeaknessRight: boolean;
    hemiparesis: boolean;
    hemiparesisLeft: boolean;
    hemiparesisRight: boolean;
    hemiparesthesia: boolean;
    hemiparesthesiaLeft: boolean;
    hemiparesthesiaRight: boolean;
    dysarthria: boolean;
    aphasia: boolean;
    ataxia: boolean;
    vertigo: boolean;
    visualProblem: boolean;
    other: boolean;
    otherText: string;
  };
  Underlying: {
    deny: boolean;
    hx: boolean;
    previousTia: boolean;
    previousStroke: boolean;
    ht: boolean;
    dm: boolean;
    dlp: boolean;
    valvularHeartDisease: boolean;
    af: boolean;
    coronaryHeartDisease: boolean;
    ckd: boolean;
    peripheralArterialDisease: boolean;
    obesity: boolean;
    smoking: boolean;
    other: boolean;
    otherText: string;
  };
  VitalSigns: {
    systolicBP: number;
    diastolicBP: number;
    heartRate: number;
    buttonHeartRate: string;
  };
  EKG12Leads: string;
  NIHSS: {
    levelOfConsciousness: number;
    twoQuestions: number;
    twoCommands: number;
    bestGaze: number;
    bestVisual: number;
    facialPalsy: number;
    bestMotorLeftArm: number;
    bestMotorRightArm: number;
    bestMotorLeftLeg: number;
    bestMotorRightLeg: number;
    limbAtaxia: number;
    sensory: number;
    bestLanguageAphasia: number;
    dysarthria: number;
    extinctionOrNeglect: number;
  };
}

const infoSchema = new mongoose.Schema({
  PatientInformation: {
    patientID: { type: Number, required: true },
    age: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    arrivalDate: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    clearDate: { type: String, default: '' },
    clearTime: { type: String, default: '' },
    lastDate: { type: String, default: '' },
    lastTime: { type: String, default: '' },
    firstDate: { type: String, default: '' },
    firstTime: { type: String, default: '' },
    onset: { type: String, required: true },
  },
  ChiefComplaint: {
    timeCourse: { type: String, required: true },
    alterationOfConsciousness: { type: Boolean, required: true },
    facialWeakness: { type: Boolean, required: true },
    facialWeaknessLeft: { type: Boolean, required: true },
    facialWeaknessRight: { type: Boolean, required: true },
    hemiparesis: { type: Boolean, required: true },
    hemiparesisLeft: { type: Boolean, required: true },
    hemiparesisRight: { type: Boolean, required: true },
    hemiparesthesia: { type: Boolean, required: true },
    hemiparesthesiaLeft: { type: Boolean, required: true },
    hemiparesthesiaRight: { type: Boolean, required: true },
    dysarthria: { type: Boolean, required: true },
    aphasia: { type: Boolean, required: true },
    ataxia: { type: Boolean, required: true },
    vertigo: { type: Boolean, required: true },
    visualProblem: { type: Boolean, required: true },
    other: { type: Boolean, required: true },
    otherText: { type: String, default: '' },
  },
  Underlying: {
    deny: { type: Boolean, required: true },
    hx: { type: Boolean, required: true },
    previousTia: { type: Boolean, required: true },
    previousStroke: { type: Boolean, required: true },
    ht: { type: Boolean, required: true },
    dm: { type: Boolean, required: true },
    dlp: { type: Boolean, required: true },
    valvularHeartDisease: { type: Boolean, required: true },
    af: { type: Boolean, required: true },
    coronaryHeartDisease: { type: Boolean, required: true },
    ckd: { type: Boolean, required: true },
    peripheralArterialDisease: { type: Boolean, required: true },
    obesity: { type: Boolean, required: true },
    smoking: { type: Boolean, required: true },
    other: { type: Boolean, required: true },
    otherText: { type: String, default: '' },
  },
  VitalSigns: {
    systolicBP: { type: Number, required: true },
    diastolicBP: { type: Number, required: true },
    heartRate: { type: Number, required: true },
    buttonHeartRate: { type: String, default: '' },
  },
  EKG12Leads: { type: String, default: '' },
  NIHSS: {
    levelOfConsciousness: { type: Number, required: true },
    twoQuestions: { type: Number, required: true },
    twoCommands: { type: Number, required: true },
    bestGaze: { type: Number, required: true },
    bestVisual: { type: Number, required: true },
    facialPalsy: { type: Number, required: true },
    bestMotorLeftArm: { type: Number, required: true },
    bestMotorRightArm: { type: Number, required: true },
    bestMotorLeftLeg: { type: Number, required: true },
    bestMotorRightLeg: { type: Number, required: true },
    limbAtaxia: { type: Number, required: true },
    sensory: { type: Number, required: true },
    bestLanguageAphasia: { type: Number, required: true },
    dysarthria: { type: Number, required: true },
    extinctionOrNeglect: { type: Number, required: true },
  },
  addDate: { type: Date, default: Date.now() },
  author: { type: String, required: true },
  imgPath: { type: Array, of: String, required: true },
  testID: { type: Number, required: true },
});

export default mongoose.model('information', infoSchema);
