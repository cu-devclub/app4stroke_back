import { Router } from 'express';
import healthRouter from './health';
import userRouter from './user';

const router = Router();

router.use(healthRouter);
// router.use(authRouter);
router.use('/user', userRouter);

export default router;
