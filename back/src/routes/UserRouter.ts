import { Router } from 'express';
import userController from '../controllers/userController';
const userRouter = Router();

userRouter.use('/users', [
    userRouter.get('/', userController.getUsers)
]);

export default userRouter;