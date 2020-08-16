import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUserRepository from '../repositories/IUsersRepositories';

import User from '../infra/typeorm/entities/Users';

interface IRequest {
    user_id: string;
    avatar_filename: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({
        user_id,
        avatar_filename,
    }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(
                'Only authenticated users can change avatar',
                401,
            );
        }

        if (user.avatar) {
            await this.storageProvider.deleteFile(user.avatar);
        }

        const filename = await this.storageProvider.saveFile(avatar_filename);

        user.avatar = filename;

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
