import { User } from './user.entity';
import { Connection, EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {

}

export const UsersRepositoryProvider = {
  provide: 'UsersRepository',
  useFactory: (connection: Connection) => connection.getCustomRepository(UsersRepository),
  inject: ['DbConnection'],
};
