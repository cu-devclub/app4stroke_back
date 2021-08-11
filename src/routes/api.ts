import { Router } from 'express';
import healthRouter from './health';
import predictScoreRouter from './predictScore';
import fileRouter from './file';

const router = Router();

router.use(healthRouter);
router.use(predictScoreRouter);
// router.use(authRouter);
router.use('/files', fileRouter);

export default router;
