import { Module } from '@nestjs/common';
import UsersService from './users.service';
import { NestConsulModule } from '@shared/modules/consul';

@Module({
    providers: [
        UsersService,
    ],
    exports: [
        UsersService,
    ],
    imports: [
        NestConsulModule,
    ],
})
export class UsersModule {
}
