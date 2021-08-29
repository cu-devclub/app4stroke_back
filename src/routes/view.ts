import { Router } from 'express';
import view from '../controllers/view';

const router = Router();

router.post('/view', view);

export default router;
