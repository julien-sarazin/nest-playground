import { Inject, Injectable } from '@nestjs/common';
import { USER_REMOTE_REPOSITORY_TOKEN, UsersRemoteRepository } from './users.remote.repository';
import { RemoteRepositoryService } from '@shared/modules/consul';
import { Users } from './users.remote.model';

@Injectable()
export default class UsersRemoteService extends RemoteRepositoryService<Users> {

    constructor(
      @Inject(USER_REMOTE_REPOSITORY_TOKEN) private readonly userRepository: UsersRemoteRepository,
    ) {
        super(Users);
    }

    public async authenticate(email: string, password: string): Promise<{ id: number }> {
        const authentication = await this.userRepository.raw({
            url: '/users/authenticate',
            method: 'POST',
            data: { email, password },
        });

        if (!authentication) {
            throw new UserNotAuthenticatedException();
        }

        return authentication;
    }
}

export class UserNotAuthenticatedException extends Error {
    constructor(message?: string) {
        super(message);
    }
}
