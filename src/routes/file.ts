import { Router } from 'express';
import fileController from '../controllers/file';
import upload from '../middlewares/upload';

const router = Router();

router.post('/upload/:foldername?', upload.array("files"), fileController.upload);
router.get('/', fileController.getFileNames);
router.get('/:foldername?/:filename', fileController.download);
 
export default router;