import httpError from '../errorHandler/httpError/httpError';
import predictData, { predict } from '../models/predictData';

const insertPredict = async (testID: Number) => {
  try {
    return {
      success: true,
      data: await new predictData({
        testID: testID,
      }).save(),
    };
  } catch (e: any) {
    return httpError(500, `DB: Can't insert ${e.toString()}`);
  }
};

const findPredict = async (testID: number) => {
  try {
    console.log(await predictData.find({ testID: testID }));
    return await predictData.find({ testID: testID });
  } catch (e: any) {
    return httpError(500, `DB: Can't Find ${e.toString()}`);
  }
};

const updatePredict = async (testID: number, data: predict) => {
  try {
    return await predictData.updateOne({ testID: testID }, data);
  } catch (e: any) {
    return httpError(500, `DB: Can't Update ${e.toString()}`);
  }
};

export { insertPredict, findPredict, updatePredict };

// updatePredict(3, {
//   prob: 0.5643072128295898,
//   top_pos_factors: [
//     'cortical lobe sign',
//     'valvular heart disease',
//     'metabolic syndrome',
//     'duration fsa (minute)',
//     'smoking',
//   ],
//   top_pos_values: ['1.0', '1.0', '0.0', '130.0', '0.0'],
//   top_pos_impacts: [
//     '0.79155517',
//     '0.5278014',
//     '0.104985274',
//     '0.06997801',
//     '0.004381033',
//   ],
//   top_neg_factors: [
//     'max ct score',
//     'age',
//     'peak clear onset',
//     'vascular disease',
//     'gradual onset',
//   ],
//   top_neg_values: ['0.05327712744474411', '20.0', '1.0', '0.0', '0.0'],
//   top_neg_impacts: [
//     '-0.85893273',
//     '-0.19961043',
//     '-0.023558479',
//     '-0.004310049',
//     '0.0',
//   ],
//   total_slices: 1,
//   max_score_slice: 1,
//   max_ct_score: 1,
//   imgPath: [],
//   heatmap_path: [],
//   ctScores: [],
// });
