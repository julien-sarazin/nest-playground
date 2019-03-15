import { Module } from '@nestjs/common';
import PractitionersService from './service/practitioners.service';
import { PractitionersController } from './controller/practitioners.controller';
import { PractitionerRepositoryProviders } from './model/repository.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
  controllers: [
    PractitionersController,
  ],
  providers: [
    ...PractitionerRepositoryProviders,
    PractitionersService,
  ],
  exports: [
    PractitionersService,
  ],
  imports: [
    DatabaseModule,
  ],
})
export class PractitionersModule {
}
