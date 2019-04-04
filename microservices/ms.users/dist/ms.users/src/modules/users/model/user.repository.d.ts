import { User } from './user.entity';
import { Connection, Repository } from 'typeorm';
export default class UsersRepository extends Repository<User> {
}
export declare const UsersRepositoryProvider: {
    provide: string;
    useFactory: (connection: Connection) => UsersRepository;
    inject: string[];
};
