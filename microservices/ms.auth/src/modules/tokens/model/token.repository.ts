import { Connection, Repository } from 'typeorm';
import IToken from './token.interface';
import { Token } from './token.entity';

export default class TokensRepository extends Repository<IToken> {

}

export const TokensRepositoryProvider = {
  provide: 'TokensRepository',
  useFactory: (connection: Connection) => connection.getCustomRepository(TokensRepository),
  inject: ['DbConnection'],
};
