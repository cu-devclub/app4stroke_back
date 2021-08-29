import { Router } from 'express';
import upload from '../middlewares/upload';
import fileController from '../controllers/file';

const router = Router();

router.post('/upload/:foldername?', upload.single("file"), fileController.upload);
router.get('/', fileController.getFileNames);
router.get('/:foldername?/:filename', fileController.download);
 
export default router;