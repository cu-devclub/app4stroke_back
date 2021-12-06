import { Router } from 'express';
import result from '../controllers/result';

const router = Router();

router.get('/results', result);

export default router;
