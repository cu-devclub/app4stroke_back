import mongoose from 'mongoose';

const uri =
  'mongodb+srv://root:qLUlc1U7tfJOjMcd@cluster0.ab6gl.mongodb.net/stroke';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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
