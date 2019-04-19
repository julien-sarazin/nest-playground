import { Logger, Module } from '@nestjs/common';
import TokensService from './service/tokens.service';
import { TokensController } from './controller/tokens.controller';
import { DatabaseModule } from '../../database/database.module';
import { TokensRepositoryProvider } from './model/token.repository';
import UsersRemoteService from '../users/remote/users.remote.service';
import { UsersModule } from '../users/users.module';

@Module({
    controllers: [
        TokensController,
    ],
    providers: [
        TokensService,
        TokensRepositoryProvider,
        UsersRemoteService,
        {
            provide: 'LoggerService',
            useClass: Logger,
        },
    ],
    exports: [
        TokensService,
    ],
    imports: [
        DatabaseModule,
        UsersModule,
    ],
})
export class TokensModule {
}
