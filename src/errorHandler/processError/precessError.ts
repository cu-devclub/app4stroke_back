import submitStatusObj from './Component/submitStatusObj';
import storage from '../../config/storage';
import { deleteInfo } from '../../middlewares/information';
import { deleteRecord } from '../../middlewares/record';
import record from '../../models/record';

export default async (Obj: submitStatusObj) => {
  if (Obj.isUploaded) {
    if (Obj.uploadID) {
      storage.deletes(`record/${Obj.uploadID}/`);
    }
  }
  if (Obj.isInsertedInfo) {
    if (Obj.testID) {
      deleteInfo(Obj.testID);
    }
  }
  if (Obj.isInsertedPredict) {
    if (Obj.uploadID) {
      deleteRecord(Obj.uploadID);
    }
  }
};
