import { Router } from 'express';
import fileController from '../controllers/file';
import { upload } from '../middlewares/upload';

const router = Router();

router.post('/upload', upload("foldername1", "filename").single("file"), fileController.upload);
router.get('/', fileController.getFileNames);
router.get('/:foldername/:filename', fileController.download);
 
export default router;