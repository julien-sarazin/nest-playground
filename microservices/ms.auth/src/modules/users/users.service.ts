import { CONSUL_SERVICE_PROVIDER, NestConsulService, RemoteRepositoryService } from '@shared/modules/consul';
import { Inject, Injectable } from '@nestjs/common';
import { Users } from './Users.model';

@Injectable()
export default class UsersService {
    private usersRepository: RemoteRepositoryService<Users>;

    constructor(
      @Inject(CONSUL_SERVICE_PROVIDER) private readonly consulService: NestConsulService,
    ) {
        this.usersRepository = consulService.getRemoteRepository<Users>(Users);
    }

    public async authenticate(email: string, password: string): Promise<{ id: number }> {
        console.log('faking the call to the service...');
        return { id: 1 };
    }
}

export class UserNotAuthenticatedException extends Error {
    constructor(message?: string) {
        super(message);
    }
}
