import { Module } from '@nestjs/common';
import CredentialsService from './service/credentials.service';
import { CredentialsController } from './controller/credentials.controller';
import { CredentialRepositoryProviders } from './model/credentials.repository';
import { DatabaseModule } from '../../database/database.module';

@Module({
  controllers: [
    CredentialsController,
  ],
  providers: [
    ...CredentialRepositoryProviders,
    CredentialsService,
  ],
  exports: [
    CredentialsService,
  ],
  imports: [
    DatabaseModule,
  ],
})
export class CredentialsModule {
}
