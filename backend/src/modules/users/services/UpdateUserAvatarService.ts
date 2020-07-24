import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepositories';
import User from '../infra/typeorm/entities/Users';

interface IRequest {
    user_id: string;
    avatar_filename: string;
}

class UpdateuserAvatarService {
    constructor(private usersRepository: IUserRepository) {}

    public async execute({
        user_id,
        avatar_filename,
    }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

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

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateuserAvatarService;
