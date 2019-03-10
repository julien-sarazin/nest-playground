import { Module} from '@nestjs/common';
import { CarsService } from './service/cars.service';
import { CarsController } from './controller/cars.controller';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule {}
