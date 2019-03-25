import { CONSUL_SERVICE_PROVIDER } from '@shared/modules/consul';
import { ConsulService } from '@shared/modules/consul';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export default class UsersService {
    constructor(
      @Inject(CONSUL_SERVICE_PROVIDER) private readonly consulService: ConsulService,
    ) {
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
