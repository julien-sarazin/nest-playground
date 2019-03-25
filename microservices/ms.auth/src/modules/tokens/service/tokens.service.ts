import {
    ForbiddenException,
    Inject,
    Injectable,
    InternalServerErrorException,
    Query,
    ServiceUnavailableException,
} from '@nestjs/common';
import IToken from '../model/token.interface';
import TokenRepository from '../model/token.repository';
import { CreateTokensDTO } from '../dto/create.dto';
import { UserService } from './user.service';
import { Token } from '../model/token.entity';

@Injectable()
export default class TokensService {

    constructor(
      @Inject('TokenRepository') private readonly tokenRepository: TokenRepository,
      @Inject('UserService') private readonly userService: UserService,
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
        try {
            const result = await this.userService
              .authenticate(dto.email, dto.password);

            const token = new Token();
            token.userId = result.id;

            return await this.tokenRepository.save(token);
        }
        catch (e) {
            if (e instanceof UserNotAuthenticatedException) {
                throw new ForbiddenException(e);
            }

            if (e instanceof ServiceUnavailableException) {
                throw e;
            }
            else {
                throw new InternalServerErrorException(e);
            }
        }
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
