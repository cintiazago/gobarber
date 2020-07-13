import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import enruseAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../conifg/upload';
import UpdateuserAvatarService from '../services/UpdateUserAvatarService';

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
