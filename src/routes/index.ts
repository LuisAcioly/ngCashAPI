
import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const routes = Router();
routes.post('/login', AuthController.authenticate);
routes.get('/auth', AuthMiddleware, AuthController.index)

export default routes;
