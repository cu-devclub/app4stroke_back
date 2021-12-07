import mongoose from 'mongoose';

export interface record {
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

export interface recordInDb extends record {
  recordID: number;
}

const recordSchema = new mongoose.Schema({
  total_slices: { type: String, default: '' },
  max_score_slice: { type: String, default: '' },
  max_ct_score: { type: String, default: '' },
  img_path: { type: Array, of: String, default: [] },
  heatmap_path: { type: Array, of: String, default: [] },
  ct_score: { type: Array, of: String, default: [] },
  prob: { type: String, default: '' },
  top_pos_factors: { type: Array, of: String, default: [] },
  top_pos_values: { type: Array, of: String, default: [] },
  top_pos_impacts: { type: Array, of: String, default: [] },
  top_neg_factors: { type: Array, of: String, default: [] },
  top_neg_values: { type: Array, of: String, default: [] },
  top_neg_impacts: { type: Array, of: String, default: [] },
  add_date: { type: Date, default: Date.now() },
  recordID: { type: Number, required: true },
});

export default mongoose.model('record', recordSchema);
