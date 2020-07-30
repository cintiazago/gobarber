import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/conatiner/providers/MailProvider/models/IMailProvider';
import IUserRepository from '../repositories/IUsersRepositories';

// import User from '../infra/typeorm/entities/Users';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        this.mailProvider.sendMail(
            email,
            'Pedido de recuperação de senha recebido.',
        );
    }
}

export default SendForgotPasswordEmailService;