import { Module} from '@nestjs/common';
import { CarsService } from './service/cars.service';
import { CarsController } from './controller/cars.controller';
import { CarRepositoryProviders } from './model/repository.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
  controllers: [
    CarsController,
  ],
  providers: [
    ...CarRepositoryProviders,
    CarsService,
  ],
  exports: [
    CarsService,
  ],
  imports: [
    DatabaseModule,
  ],
})
export class CarsModule {}
