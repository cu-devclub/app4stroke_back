import { Router } from 'express';
import fileController from '../controllers/file';

const router = Router();

router.post('/upload', fileController.upload);
router.get('/', fileController.getFileList);
router.get('/:name', fileController.download);

export default router;
