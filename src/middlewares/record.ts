import BaseError from '../errorHandler/httpError/Component/baseError';
import httpError from '../errorHandler/httpError/httpError';
import recordModel, { recordInDb, record } from '../models/record';

const insertRecord = async (data: record) => {
  try {
    const count = await countRecord();
    if (count instanceof BaseError) {
      throw count;
    }
    return await new recordModel({ recordID: count + 1, ...data }).save();
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

const allRecord = async () => {
  try {
    return await recordModel.find({});
  } catch (e: any) {
    return httpError(
      500,
      `Internal Server Error : DB Error -> Can't Find -> ${e.toString()}`,
    );
  }
};

const updateRecord = async (ID: number, data: Partial<recordInDb>) => {
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

const countRecord = async (): Promise<number | BaseError> => {
  try {
    return await recordModel.countDocuments({});
  } catch (e: any) {
    return httpError(
      500,
      `Internal Server Error : DB Error -> Can't count -> ${e.toString()}`,
    );
  }
};

export {
  insertRecord,
  findRecord,
  allRecord,
  updateRecord,
  deleteRecord,
  countRecord,
};
