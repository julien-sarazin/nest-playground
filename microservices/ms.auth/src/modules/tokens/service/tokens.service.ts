import {
    ForbiddenException,
    Inject,
    Injectable,
    InternalServerErrorException,
    LoggerService,
    Query,
    ServiceUnavailableException,
} from '@nestjs/common';
import IToken from '../model/token.interface';
import { CreateTokensDTO } from '../dto/create.dto';
import { Token } from '../model/token.entity';
import UsersRemoteService, { UserNotAuthenticatedException } from '../../users/remote/users.remote.service';
import TokensRepository from '../model/token.repository';
import * as jwt from 'jsonwebtoken';

@Injectable()
export default class TokensService {

    constructor(
      @Inject('TokensRepository') private readonly tokensRepository: TokensRepository,
      // @Inject('UsersRemoteService') private readonly userService: UsersRemoteService,
      @Inject('LoggerService') private readonly loggerService: LoggerService,
    ) {
    }

    public async list(@Query() query): Promise<IToken[]> {
        return await this.tokensRepository
          .find();
    }

    public async get(id: number): Promise<IToken> {
        const result = await this.tokensRepository
          .findOne(id);

        if (!result) {
            throw new TokenNotFoundException();
        }

        return result;
    }

    public async peek(@Query() query): Promise<IToken> {
        return await this.tokensRepository
          .findOne(query);
    }

    // public async create(dto: CreateTokensDTO): Promise<any> {
    //     try {
    //         const result = await this.userService
    //           .authenticate(dto.email, dto.password);
    //
    //         const token = new Token();
    //         token.userId = result.id;
    //
    //         return await this.tokensRepository
    //           .save(token)
    //           .then(persistedToken => {
    //               return jwt.sign({ ...persistedToken }, 'fr0d0n s3cr3t');
    //           });
    //     }
    //
    //     catch (e) {
    //         this.loggerService.error(e.message, e.stack, TokensService.name);
    //
    //         if (e instanceof UserNotAuthenticatedException) {
    //             throw new ForbiddenException(e);
    //         }
    //
    //         if (e instanceof ServiceUnavailableException) {
    //             throw e;
    //         }
    //         else {
    //             throw new InternalServerErrorException(e);
    //         }
    //     }
    // }

    public async remove(id: number): Promise<boolean> {
        const entity = await this.tokensRepository
          .findOne(id);

        const result = await this.tokensRepository
          .remove(entity);

        return true;
    }
}

export class TokenNotFoundException extends Error {
    constructor(message?: string) {
        super(message);
    }
}
