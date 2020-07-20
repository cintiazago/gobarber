import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateuserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import enruseAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
        name,
        email,
        password,
    });

    delete user.password;

    return response.json(user);
});

usersRouter.patch(
    '/avatar',
    enruseAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const updateUserAvatar = new UpdateuserAvatarService();

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatar_filename: request.file.filename,
        });

        delete user.password;

        return response.json(user);
    },
);

export default usersRouter;
