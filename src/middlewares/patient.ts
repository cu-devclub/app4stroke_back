import httpError from '../errorHandler/httpError/httpError';
import informationData, { info, infoDb } from '../models/infoData';

export interface insertInfoResult {
  success: Boolean;
  data: Object;
}

const insertInfo = async (
  author: string,
  data: info,
  filePath: Array<string>,
): Promise<insertInfoResult | any> => {
  delete data.testID;
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
    return await informationData.updateOne({ testID: id }, { filePath: path });
  } catch (e: any) {
    return httpError(500, `DB: Can't path ${e.toString()}`);
  }
};

const updateInfo = async (id: number, data: infoDb) => {
  try {
    return await informationData.updateOne({ testID: id }, data);
  } catch (e: any) {
    return httpError(500, `DB: Can't Update Information ${e.toString()}`);
  }
};

const countInfo = async () => {
  try {
    if ((await informationData.countDocuments({})) == 0) {
      return 0;
    } else {
      const last = await informationData.find().sort({ testID: -1 }).limit(1);
      return last[0].testID;
    }
  } catch (e: any) {
    return httpError(500, `DB: Can't count ${e.toString()}`);
  }
};

const findInfo = async (filter: object) => {
  try {
    return await informationData.find(filter);
  } catch (e: any) {
    return httpError(500, `DB: Can't Find ${e.toString()}`);
  }
};

const delInfo = async (id: number) => {
  try {
    return await informationData.deleteOne({ testID: id });
  } catch (e: any) {
    return httpError(500, `DB: Can't Delete ${e.toString()}`);
  }
};

export { insertInfo, updateInfoPath, countInfo, findInfo, updateInfo, delInfo };
