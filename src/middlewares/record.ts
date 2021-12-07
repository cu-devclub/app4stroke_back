import httpError from '../errorHandler/httpError/httpError';
import recordModel, { record } from '../models/record';

const insertRecord = async (data: record) => {
  try {
    const count = await countRecord();
    return {
      success: true,
      data: await new recordModel({ recordID: count, ...data }).save(),
    };
  } catch (e: any) {
    return httpError(
      500,
      `Internal Server Error : DB Error -> Can't insert Record -> ${e.toString()}`,
    );
  }
};

const findRecord = async (ID: Number) => {
  try {
    return await recordModel.find({ recordID: ID });
  } catch (e: any) {
    return httpError(
      500,
      `Internal Server Error : DB Error -> Can't Find -> ${e.toString()}`,
    );
  }
};

const updateRecord = async (ID: number, data: Partial<record>) => {
  try {
    return await recordModel.updateOne({ recordID: ID }, data);
  } catch (e: any) {
    return httpError(
      500,
      `Internal Server Error : DB Error -> Can't update -> ${e.toString()}`,
    );
  }
};

const deleteRecord = async (ID: number) => {
  try {
    return await recordModel.deleteOne({ recordID: ID });
  } catch (e: any) {
    return httpError(
      500,
      `Internal Server Error : DB Error -> Can't delete -> ${e.toString()}`,
    );
  }
};

const countRecord = async () => {
  try {
    if ((await recordModel.countDocuments({})) == 0) {
      return 0;
    } else {
      const last = await recordModel.find().sort({ testID: -1 }).limit(1);
      return last[0].testID;
    }
  } catch (e: any) {
    return httpError(
      500,
      `Internal Server Error : DB Error -> Can't count -> ${e.toString()}`,
    );
  }
};

export { insertRecord, findRecord, updateRecord, deleteRecord, countRecord };
