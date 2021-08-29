import { Router } from 'express';
import submitPatient from '../controllers/submitPatient';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

router.post('/submitPatient', upload.array('file'), submitPatient);

export default router;
