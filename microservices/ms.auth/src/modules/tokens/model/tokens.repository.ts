import { Connection, Repository } from 'typeorm';
import { Tokens } from './tokens.entity';

export default class TokenRepository extends Repository<Tokens> {

}

export const TokensRepositoryProvider = {
  provide: 'TokensRepository',
  useFactory: (connection: Connection) => connection.getRepository(Tokens),
  inject: ['DbConnection'],
};
