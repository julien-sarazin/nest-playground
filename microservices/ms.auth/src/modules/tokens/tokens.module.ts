import { Logger, Module } from '@nestjs/common';
import TokensService from './service/tokens.service';
import { TokensController } from './controller/tokens.controller';
import { DatabaseModule } from '../../database/database.module';
import TokenRepository, { TokensRepositoryProvider } from './model/token.repository';
import { UsersModule } from '../users/users.module';
import UsersService from '../users/users.service';

@Module({
    controllers: [
        TokensController,
    ],
    providers: [
        TokensService,
        TokensRepositoryProvider,
        UsersService,
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
