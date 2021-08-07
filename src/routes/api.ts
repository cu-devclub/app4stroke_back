import { Router } from 'express';
import healthRouter from './health';
import fileRouter from './file';

const router = Router();

router.use(healthRouter);
// router.use(authRouter);
router.use('/files', fileRouter);

export default router;
