import { CONSUL_SERVICE_PROVIDER, NestConsulService, RemoteRepositoryService } from '@shared/modules/consul';
import { Users } from './users.remote.model';

export const USER_REMOTE_REPOSITORY_TOKEN = 'UsersRemoteRepositoryToken';

export class UsersRemoteRepository extends RemoteRepositoryService<Users> {

}

export const UsersRemoteRepositoryProvider = {
    provide: USER_REMOTE_REPOSITORY_TOKEN,
    useFactory: async (consulService: NestConsulService) => await consulService.getRemoteRepository<Users>(Users, 'users'),
    inject: [CONSUL_SERVICE_PROVIDER],
};
