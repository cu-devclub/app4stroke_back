import { Router } from 'express';
import userController from '../controllers/user';
import auth from '../middlewares/decodeToken';
import login from '../controllers/login';

const router = Router();

router.post('/signup', userController.signup);
router.post('/login', login);

router.get('/', userController.getUser);
router.post('/', userController.postUser);
router.get('/list', userController.getUserList);
router.get('/:id', userController.updateUser);
router.get('/delete/:id', userController.deleteUser);

export default router;
