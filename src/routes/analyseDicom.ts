import { Router } from 'express';
import analyseDicom from '../controllers/analyseDicom';
const router = Router();

router.post('/analyseDicom', analyseDicom);

export default router;
