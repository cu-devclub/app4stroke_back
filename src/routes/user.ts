import { Router } from 'express';
import userController from '../controllers/user';

const router = Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/me', userController.me);

export default router;
