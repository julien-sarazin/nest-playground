import { Module } from '@nestjs/common';
import UsersRemoteService from './remote/users.remote.service';
import { NestConsulModule } from '@shared/modules/consul/src';
import { UsersRemoteRepositoryProvider } from './remote/users.remote.repository';

@Module({
    providers: [
        UsersRemoteService,
        UsersRemoteRepositoryProvider,
    ],
    exports: [
        UsersRemoteService,
        UsersRemoteRepositoryProvider,
    ],
    imports: [
        NestConsulModule,
    ],
})
export class UsersModule {
}
