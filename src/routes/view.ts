import { Router } from 'express';
import view from '../controllers/view';

const router = Router();

router.get('/view/:id', view);

export default router;
