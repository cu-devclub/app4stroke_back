import { Router } from 'express';
import test from '../controllers/test';

const router = Router();

router.post('/test', test);

export default router;
