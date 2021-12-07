import mongoose from 'mongoose';

export interface record {
  total_slices: Number;
  max_score_slice: Number;
  max_ct_score: Number;
  img_path: Array<string>;
  heatmap_path: Array<string>;
  ct_score: Array<number>;
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
  recordID: { type: Number, required: true },
  total_slices: { type: Number, required: true },
  max_score_slice: { type: Number, required: true },
  max_ct_score: { type: Number, required: true },
  img_path: { type: Array, of: String, required: true },
  heatmap_path: { type: Array, of: String, required: true },
  ct_score: { type: Array, of: Number, required: true },
  prob: { type: Number, required: true },
  top_pos_factors: { type: Array, of: String, required: true },
  top_pos_values: { type: Array, of: String, required: true },
  top_pos_impacts: { type: Array, of: Number, required: true },
  top_neg_factors: { type: Array, of: String, required: true },
  top_neg_values: { type: Array, of: String, required: true },
  top_neg_impacts: { type: Array, of: Number, required: true },
  create_date: { type: Date, default: Date.now() },
});

export default mongoose.model('record', recordSchema);
