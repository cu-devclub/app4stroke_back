import { Router } from 'express';
import submitPatient from '../controllers/submitPatient';
const router = Router();

router.post('/submitPatient', submitPatient);

export default router;
