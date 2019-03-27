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
        this.consulService
          .getRemoteRepository<Users>(Users, 'users')
          .raw({
              path: '/authenticate',
              method: 'POST',
              data: { email, password },
          });

        return { id: 1 };
    }
}

export class UserNotAuthenticatedException extends Error {
    constructor(message?: string) {
        super(message);
    }
}
