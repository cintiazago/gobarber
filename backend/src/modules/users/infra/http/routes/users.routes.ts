import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import enruseAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);
const userAvatarController = new UserAvatarController();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);

usersRouter.patch(
    '/avatar',
    enruseAuthenticated,
    upload.single('avatar'),
    userAvatarController.update,
);

export default usersRouter;
