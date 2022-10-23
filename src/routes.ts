import Router from 'express'
import userController from './controllers/userController';

const routes = Router();

routes.post('/user', userController.create)

export default routes;