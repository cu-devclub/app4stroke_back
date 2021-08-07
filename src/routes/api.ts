import { Router } from 'express';
import healthRouter from './health';
import predictScoreRouter from './predictScore';

const router = Router();

router.use(healthRouter);
router.use(predictScoreRouter);
// router.use(authRouter);

export default router;
