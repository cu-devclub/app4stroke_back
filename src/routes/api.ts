import { Router } from 'express';
import healthRouter from './health';
import predictScoreRouter from './predictScore';
import fileRouter from './file';
import analyseDicom from './analyseDicom';
import submitPatient from './submitPatient';

const router = Router();

router.use(healthRouter);
router.use(predictScoreRouter);
router.use(analyseDicom);
router.use(submitPatient);
// router.use(authRouter);
router.use('/files', fileRouter);

export default router;
