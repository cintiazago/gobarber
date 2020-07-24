import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateuserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import enruseAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const usersRepository = new UsersRepository();
    const createUser = new CreateUserService(usersRepository);

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
        const usersRepository = new UsersRepository();
        const updateUserAvatar = new UpdateuserAvatarService(usersRepository);

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatar_filename: request.file.filename,
        });

        delete user.password;

        return response.json(user);
    },
);

export default usersRouter;
