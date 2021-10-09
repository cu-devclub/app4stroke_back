import { Router } from 'express';
import fileController from '../controllers/file';

const router = Router();

router.post('/upload', fileController.upload);
router.get('/download/:path(*)', fileController.download);

export default router;
