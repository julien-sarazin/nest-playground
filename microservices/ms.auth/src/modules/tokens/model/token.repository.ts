import { Connection, Repository } from 'typeorm';
import { Token } from './token.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(Token)
export default class TokensRepository extends Repository<Token> {

}

export const TokensRepositoryProvider = {
  provide: 'TokensRepository',
  useFactory: (connection: Connection) => connection.getCustomRepository(TokensRepository),
  inject: ['DbConnection'],
};
