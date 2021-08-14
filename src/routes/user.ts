import { Router } from 'express';
import userController from '../controllers/user';

const router = Router();

router.get('/', userController.getUser);
router.post('/', userController.postUser);
router.get('/list', userController.getUserList);
router.get('/:id', userController.updateUser);
router.get('/delete/:id', userController.deleteUser);

export default router;