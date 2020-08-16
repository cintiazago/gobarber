import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import SendForgotPasswordEmail from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepostory';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmail;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokenRepository = new FakeUserTokensRepository();

        sendForgotPasswordEmail = new SendForgotPasswordEmail(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokenRepository,
        );
    });

    it('should be able to revover the password using the email', async () => {
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com',
        });

        expect(sendMail).toBeCalled();
    });

    it('should not be able to revover a non-exsting user password', async () => {
        await expect(
            sendForgotPasswordEmail.execute({
                email: 'johndoe@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to generate a forgot password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com',
        });

        expect(generateToken).toBeCalledWith(user.id);
    });
});
