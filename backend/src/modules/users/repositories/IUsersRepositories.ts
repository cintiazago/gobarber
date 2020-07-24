import User from '../infra/typeorm/entities/Users';
import ICreateUsersDTO from '../dtos/ICreateUsersDTO';

export default interface IUsersRepository {
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(data: ICreateUsersDTO): Promise<User>;
    save(user: User): Promise<User>;
}
