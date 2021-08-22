import mongoose from 'mongoose';

export interface predict {
  totalSlices: String;
  maxScoreSlice: String;
  maxCtScore: String;
  imgPath: Array<string>;
  heatmapPath: Array<string>;
  ctScores: Array<number>;
  prop: Number;
  topPosFactors: Array<string>;
  topPosValues: Array<string>;
  topPosImpacts: Array<number>;
  topNegFactors: Array<string>;
  topNegValues: Array<string>;
  topNegImpacts: Array<number>;
}

const predictSchema = new mongoose.Schema({
  totalSlices: { type: String, default: '' },
  maxScoreSlice: { type: String, default: '' },
  maxCtScore: { type: String, default: '' },
  imgPath: { type: Array, of: String, default: '' },
  heatmapPath: { type: Array, of: String, default: '' },
  ctScores: { type: Array, of: String, default: '' },
  prop: { type: String, require: true },
  topPosFactors: { type: Array, of: String, default: '' },
  topPosValues: { type: Array, of: String, default: '' },
  topPosImpacts: { type: Array, of: String, default: '' },
  topNegFactors: { type: Array, of: String, default: '' },
  topNegValues: { type: Array, of: String, default: '' },
  topNegImpacts: { type: Array, of: String, default: '' },
  addDate: { type: Date, default: Date.now() },
  testID: { type: Number, required: true },
});

export default mongoose.model('predictData', predictSchema);
