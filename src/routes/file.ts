import { Router } from 'express';
import fileController from '../controllers/file';

const router = Router();

router.get('/download/:path(*)', fileController.download);

export default router;
