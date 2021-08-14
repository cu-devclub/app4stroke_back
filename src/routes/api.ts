import { Router } from 'express';
import healthRouter from './health';
import userRouter from './user';
import fileRouter from './file';

const router = Router();

router.use(healthRouter);
// router.use(authRouter);
router.use('/user', userRouter);
router.use('/files', fileRouter);

export default router;
