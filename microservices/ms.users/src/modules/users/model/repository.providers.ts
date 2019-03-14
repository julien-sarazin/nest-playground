import { Connection } from 'typeorm';
import { User } from './user.entity';

export const repositoryProviers = [
  {
    provide: 'UserRepository',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DbConnection'],
  },
];
