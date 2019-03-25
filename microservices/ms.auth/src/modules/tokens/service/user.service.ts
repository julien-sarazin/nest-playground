import { CONSUL_SERVICE_PROVIDER } from '@shared/modules/consul';
import { ConsulService } from '@shared/modules/consul/src';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(
      @Inject(CONSUL_SERVICE_PROVIDER) private readonly consulService: ConsulService,
    ) {}

    public async authenticate(email: string, password: string): Promise<{ id: number }> {
        const remoteService = await this.consulService
          .next({ name: 'users' });

        return await remoteService
          .post('/users/authenticate', { email, password });
    }
}
