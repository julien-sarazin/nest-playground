import { Module } from '@nestjs/common';
import TokensService from './service/tokens.service';
import { TokensController } from './controller/tokens.controller';
import { DatabaseModule } from '../../database/database.module';
import TokenRepository from './model/tokens.repository';
import { ConsulModule } from '../../../../shared/modules/consul/src';

@Module({
  controllers: [
    TokensController,
  ],
  providers: [
    TokensService,
    TokenRepository,
  ],
  exports: [
    TokensService,
  ],
  imports: [
    DatabaseModule,
    ConsulModule,
  ],
})
export class TokensModule {
}
