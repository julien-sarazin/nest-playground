import { Inject, Injectable, Query } from '@nestjs/common';
import { Car } from '../model/car.entity';
import ICar from '../model/car.interface';
import { Repository } from 'typeorm';
import { CarCreateDTO } from '../dto/create.dto';
import { CarUpdateDTO } from '../dto/update.dto';

@Injectable()
export default class CarsService {

  constructor(
    @Inject('CarRepository') private readonly carRepository: Repository<Car>,
  ) {
  }

  public async list(@Query() query): Promise<ICar[]> {
    return await this.carRepository
      .find();
  }

  public async get(id: number): Promise<ICar> {
    const result = await this.carRepository
      .findOneOrFail(id);

    if (!result) {
      throw new CarNotFoundException();
    }

    return result;
  }

  public async peek(@Query() query): Promise<ICar> {
    return await this.carRepository
      .findOne(query);
  }

  public async create(dto: CarCreateDTO): Promise<ICar> {
    return await this.carRepository
      .save(dto);
  }

  public async update(id: number, dto: CarUpdateDTO): Promise<boolean> {
    const result = await this.carRepository
      .update(id, dto);

    console.log('result', result);

    return true;
  }

  public async remove(id: number): Promise<boolean> {
    const entity = await this.carRepository
      .findOneOrFail(id);

    const result = await this.carRepository
      .remove(entity);

    console.log(result);
    return true;
  }
}

export class CarNotFoundException extends Error {
  constructor(message?: string) {
    super(message);
  }
}
