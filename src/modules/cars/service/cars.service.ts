import { Injectable } from '@nestjs/common';
import Car from '../model/car.model';

@Injectable()
export class CarsService {
  private cars: Car[] = [];

  create(car: Car) {
    this.cars.push(car);
  }

  find() {
    return this.cars;
  }
}
