import { Router } from 'express';
import view from '../controllers/view';
import auth from '../controllers/auth';

const router = Router();

router.get('/view/:id', auth, view);

export default router;
