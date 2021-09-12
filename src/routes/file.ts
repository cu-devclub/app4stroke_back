import { Router } from 'express';
import fileController from '../controllers/file';

const router = Router();

router.post('/upload', fileController.upload);
router.get('/download/:filePath(*)', fileController.download);

export default router;
