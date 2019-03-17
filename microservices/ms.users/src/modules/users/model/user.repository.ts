import { User } from './user.entity';
import { Connection, EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {

}

export const UsersRepositoryProvider = {
  provide: 'UserRepository',
  useFactory: (connection: Connection) => connection.getCustomRepository(UserRepository),
  inject: ['DbConnection'],
};
