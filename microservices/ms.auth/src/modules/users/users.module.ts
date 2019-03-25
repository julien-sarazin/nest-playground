import { Module } from '@nestjs/common';
import { ConsulModule } from '@shared/modules/consul/src';
import UsersService from './users.service';

@Module({
    providers: [
        UsersService,
    ],
    exports: [
        UsersService,
    ],
    imports: [
        ConsulModule,
    ],
})
export class UsersModule {
}
