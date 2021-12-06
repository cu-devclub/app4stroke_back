import { Router } from 'express';
import result from '../controllers/result';
import auth from '../controllers/auth';

const router = Router();

router.get('/results', auth, result);

export default router;
