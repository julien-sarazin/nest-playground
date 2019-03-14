import { Module } from '@nestjs/common';
import PatientsService from './service/patients.service';
import { PatientsController } from './controller/patients.controller';
import { PatientRepositoryProviders } from './model/repository.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
  controllers: [
    PatientsController,
  ],
  providers: [
    ...PatientRepositoryProviders,
    PatientsService,
  ],
  exports: [
    PatientsService,
  ],
  imports: [
    DatabaseModule,
  ],
})
export class PatientsModule {
}
