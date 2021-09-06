import { NumberSchema } from 'joi';
import httpError from '../errorHandler/httpError/httpError';
import informationData, { info } from '../models/infoData';

export interface insertInfoResult {
  success: Boolean;
  data: Object;
}

const insertInfo = async (
  author: string,
  data: info,
  filePath: Array<string>,
): Promise<insertInfoResult | any> => {
  try {
    const count = await countInfo();
    if (count instanceof Error) {
      throw count;
    }
    return {
      success: true,
      data: await new informationData({
        ...data,
        author: author,
        filePath: filePath,
        testID: count + 1,
      }).save(),
    };
  } catch (e: any) {
    return httpError(500, `DB: Can't insert ${e.toString()}`);
  }
};

const updateInfoPath = async (id: number, path: Array<string>) => {
  try {
    return await informationData.updateOne({ testID: id }, { imgPath: path });
  } catch (e: any) {
    return httpError(500, `DB: Can't Update ${e.toString()}`);
  }
};

const countInfo = async () => {
  try {
    return await informationData.countDocuments();
  } catch (e: any) {
    return httpError(500, `DB: Can't count ${e.toString()}`);
  }
};

const findInfo = async (testID: number) => {
  try {
    return await informationData.find({ testID: testID });
  } catch (e: any) {
    return httpError(500, `DB: Can't Find ${e.toString()}`);
  }
};

export { insertInfo, updateInfoPath, countInfo, findInfo };
