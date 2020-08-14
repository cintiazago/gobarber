import User from '../infra/typeorm/entities/Users';
import ICreateUsersDTO from '../dtos/ICreateUsersDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {
    findAllProviders(data?: IFindAllProvidersDTO): Promise<User[]>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(data: ICreateUsersDTO): Promise<User>;
    save(user: User): Promise<User>;
}
