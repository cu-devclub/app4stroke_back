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
