import { Router } from 'express';
import healthRouter from './health';
import userRouter from './user';
import fileRouter from './file';
import submitPatientRouter from './submitPatient';
import view from './view';

const router = Router();

router.use(healthRouter);
router.use(submitPatientRouter);
router.use(view);
// router.use(authRouter);
router.use('/user', userRouter);
router.use('/files', fileRouter);

export default router;
