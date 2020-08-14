import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUsersRepositories';

import User from '@modules/users/infra/typeorm/entities/Users';

interface IRequest {
    user_id: string;
}

@injectable()
class ListProvidersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,
    ) {}

    public async execute({ user_id }: IRequest): Promise<User[]> {
        const user = await this.usersRepository.findAllProviders({
            except_user_id: user_id,
        });

        return user;
    }
}

export default ListProvidersService;
