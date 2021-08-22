import { Router } from 'express';
import submitPatient from '../controllers/submitPatient';
import multer from 'multer';
const upload = multer({ dest: 'temp/' });

const router = Router();

router.post('/submitPatient', upload.array('file'), submitPatient);

export default router;
