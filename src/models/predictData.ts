import mongoose from 'mongoose';

export interface predict {
  total_slices: Number;
  max_score_slice: Number;
  max_ct_score: Number;
  imgPath: Array<string>;
  heatmap_path: Array<string>;
  ctScores: Array<number>;
  prob: Number;
  top_pos_factors: Array<string>;
  top_pos_values: Array<string>;
  top_pos_impacts: Array<string>;
  top_neg_factors: Array<string>;
  top_neg_values: Array<string>;
  top_neg_impacts: Array<string>;
}

export interface predictDb extends predict {
  testID: number;
}

const predictSchema = new mongoose.Schema({
  total_slices: { type: String, default: '' },
  maxScmax_score_sliceoreSlice: { type: String, default: '' },
  max_ct_score: { type: String, default: '' },
  imgPath: { type: Array, of: String, default: [] },
  heatmapPath: { type: Array, of: String, default: [] },
  ctScores: { type: Array, of: String, default: [] },
  prob: { type: String, default: '' },
  top_pos_factors: { type: Array, of: String, default: [] },
  top_pos_values: { type: Array, of: String, default: [] },
  top_pos_impacts: { type: Array, of: String, default: [] },
  top_neg_factors: { type: Array, of: String, default: [] },
  top_neg_values: { type: Array, of: String, default: [] },
  top_neg_impacts: { type: Array, of: String, default: [] },
  addDate: { type: Date, default: Date.now() },
  testID: { type: Number, required: true },
});

export default mongoose.model('predict', predictSchema);
