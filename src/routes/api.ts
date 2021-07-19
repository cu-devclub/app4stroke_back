import { Router } from 'express';
import healthRouter from './health';

const router = Router();

router.use(healthRouter);
// router.use(authRouter);

export default router;
