import { Router } from 'express';
import fileController from '../controllers/file';
import auth from '../controllers/auth';

const router = Router();

router.get('/download/:path(*)', auth, fileController.download);

export default router;
