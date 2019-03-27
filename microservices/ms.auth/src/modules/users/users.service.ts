import { CONSUL_SERVICE_PROVIDER } from '@shared/modules/consul';
import { Inject, Injectable } from '@nestjs/common';
import { Users } from './Users.model';
import { NestConsulService, RemoteRepositoryService } from '@shared/modules/consul/src';

@Injectable()
export default class UsersService {
    private usersRepository: RemoteRepositoryService<Users>;

    constructor(
      @Inject(CONSUL_SERVICE_PROVIDER) private readonly consulService: NestConsulService,
    ) {

    }

    public async authenticate(email: string, password: string): Promise<{ id: number }> {

        const authentication = await this.consulService
          .getRemoteRepository<Users>(Users, 'users')
          .raw({
              url: '/users/authenticate',
              method: 'POST',
              data: { email, password },
          });

        console.log('> authentication:', authentication);
        // TODO: use jwt to encrypt the token
        return authentication;
    }
}

export class UserNotAuthenticatedException extends Error {
    constructor(message?: string) {
        super(message);
    }
}
