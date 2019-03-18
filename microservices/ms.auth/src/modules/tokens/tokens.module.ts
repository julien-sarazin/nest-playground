import { Module } from '@nestjs/common';
import TokensService from './service/tokens.service';
import { TokensController } from './controller/tokens.controller';
import { TokenRepositoryProviders } from './model/tokens.repository';
import { DatabaseModule } from '../../database/database.module';

@Module({
  controllers: [
    TokensController,
  ],
  providers: [
    ...TokenRepositoryProviders,
    TokensService,
  ],
  exports: [
    TokensService,
  ],
  imports: [
    DatabaseModule,
  ],
})
export class TokensModule {
}
