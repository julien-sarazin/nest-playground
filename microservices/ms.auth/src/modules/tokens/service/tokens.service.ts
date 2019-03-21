import { Inject, Injectable, Query } from '@nestjs/common';
import IToken from '../model/tokens.interface';
import TokenRepository from '../model/tokens.repository';
import { CreateTokensDTO } from '../dto/create.dto';

@Injectable()
export default class TokensService {

  constructor(
    @Inject('TokenRepository') private readonly tokenRepository: TokenRepository,
  ) {
  }

  public async list(@Query() query): Promise<IToken[]> {
    return await this.tokenRepository
      .find();
  }

  public async get(id: number): Promise<IToken> {
    const result = await this.tokenRepository
      .findOne(id);

    if (!result) {
      throw new TokenNotFoundException();
    }

    return result;
  }

  public async peek(@Query() query): Promise<IToken> {
    return await this.tokenRepository
      .findOne(query);
  }

  public async create(dto: CreateTokensDTO): Promise<IToken> {
    // Ask User service if the user exists
    // if so, create a Token
    // encrypt the identifier
    return {
      id: 1,
      userId: 1,
    };
  }

  public async remove(id: number): Promise<boolean> {
    const entity = await this.tokenRepository
      .findOne(id);

    const result = await this.tokenRepository
      .remove(entity);

    return true;
  }
}

export class TokenNotFoundException extends Error {
  constructor(message?: string) {
    super(message);
  }
}
