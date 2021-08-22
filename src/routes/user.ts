import { Router } from 'express';
import userController from '../controllers/user';
import auth from '../middlewares/auth';

const router = Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/me', auth, userController.me);

router.get('/', userController.getUser);
router.post('/', userController.postUser);
router.get('/list', userController.getUserList);
router.get('/:id', userController.updateUser);
router.get('/delete/:id', userController.deleteUser);

export default router;
