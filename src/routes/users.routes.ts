import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const userRoutes = Router();

userRoutes.post('/sign-up', UsersController.store);
userRoutes.get('/get-balance', AuthMiddleware, UsersController.getBalance);
userRoutes.get('/get-users', AuthMiddleware, UsersController.getAllUsers);

export default userRoutes;