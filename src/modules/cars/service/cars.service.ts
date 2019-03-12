import { Inject, Injectable } from '@nestjs/common';
import Car from '../model/car.interface';
import { Repository } from 'typeorm';
import { CarCreateDTO } from '../dto/create.dto';
import ICar from '../model/car.interface';

@Injectable()
export class CarsService {
  constructor(
    @Inject('CarRepository')
    private readonly carRepository: Repository<Car>,
  ) {
  }

  public async find(): Promise<Car[]> {
    return await this.carRepository.find();
  }

  public async create(dto: CarCreateDTO): Promise<ICar> {
    return await this.carRepository
      .save(dto);
  }
}
