import { Inject, Injectable } from '@nestjs/common';
import { USER_REMOTE_REPOSITORY_TOKEN, UsersRemoteRepository } from './users.remote.repository';

@Injectable()
export default class UsersRemoteService {

    constructor(
      @Inject(USER_REMOTE_REPOSITORY_TOKEN) private readonly userRepository: UsersRemoteRepository,
    ) {
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
