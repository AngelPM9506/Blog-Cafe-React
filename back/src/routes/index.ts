import { Router, Request, Response } from 'express';
import userRouter from './UserRouter';

const router = Router();

router.use('/api', [userRouter]);

export default router;