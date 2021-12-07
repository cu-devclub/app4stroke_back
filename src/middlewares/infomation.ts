import BaseError from '../errorHandler/httpError/Component/baseError';
import httpError from '../errorHandler/httpError/httpError';
import informationData, { info } from '../models/infoData';

export interface insertInfoResult {
  success: Boolean;
  data: Object;
}

const insertInfo = async (data: info): Promise<info | BaseError> => {
  try {
    const count = await countInfo();
    if (count instanceof Error) {
      throw count;
    }
    return <info>(<unknown>await new informationData(data).save());
  } catch (e: any) {
    return httpError(500, `DB: Can't insert ${e.toString()}`);
  }
};

const updateInfo = async (ID: number, data: Partial<info>) => {
  try {
    return await informationData.updateOne({ testID: ID }, data);
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

const findInfo = async (ID: number) => {
  try {
    return await informationData.find({ testID: ID });
  } catch (e: any) {
    return httpError(500, `DB: Can't Find ${e.toString()}`);
  }
};

const deleteInfo = async (id: number) => {
  try {
    return await informationData.deleteOne({ testID: id });
  } catch (e: any) {
    return httpError(500, `DB: Can't Delete ${e.toString()}`);
  }
};

export { insertInfo, countInfo, findInfo, updateInfo, deleteInfo };
