import submitStatusObj from './Component/submitStatusObj';
import storage from '../../config/storage';
import { delInfo } from '../../middlewares/patient';
import { delPredict } from '../../middlewares/predict';

export default async (Obj: submitStatusObj) => {
  if (Obj.testID) {
    if (Obj.isInsertedInfo) {
      await delInfo(Obj.testID);
    }
    if (Obj.isInsertedPredict) {
      await delPredict(Obj.testID);
    }
    if (Obj.isUploaded) {
      storage.deletes(`result/${Obj.testID}`);
    }
  }
};
