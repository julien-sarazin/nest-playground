import { Inject, Injectable } from '@nestjs/common';
import Car from '../model/car.interface';
import { Repository } from 'typeorm';

@Injectable()
export class CarsService {
  constructor(
    @Inject('CarRepository')
    private readonly carRepository: Repository<Car>,
  ) {}

  public async find(): Promise<Car[]> {
    return await this.carRepository.find();
  }
}
