import { Connection, Repository } from 'typeorm';
import IToken from './token.interface';
import { Token } from './token.entity';

export default class TokenRepository extends Repository<IToken> {

}

export const TokensRepositoryProvider = {
  provide: 'TokensRepository',
  useFactory: (connection: Connection) => connection.getRepository(Token),
  inject: ['DbConnection'],
};
