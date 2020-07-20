import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/Users';

interface Request {
    user_id: string;
    avatar_filename: string;
}

class UpdateuserAvatarService {
    public async execute({ user_id, avatar_filename }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(user_id);

        if (!user) {
            throw new AppError(
                'Only authenticated users can change avatar.',
                401,
            );
        }

        if (user.avatar) {
            // Deletar avatar anterior

            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );

            const avatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if (avatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatar_filename;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateuserAvatarService;
