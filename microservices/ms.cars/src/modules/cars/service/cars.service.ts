import { Delete, Get, Inject, Injectable, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import Car from '../model/car.interface';
import { Repository } from 'typeorm';
import { CarCreateDTO } from '../dto/create.dto';
import ICar from '../model/car.interface';
import { CarUpdateDTO } from '../dto/update.dto';

@Injectable()
export class CarsService {
  constructor(
    @Inject('CarRepository')
    private readonly carRepository: Repository<Car>,
  ) {
  }

  public async create(dto: CarCreateDTO): Promise<ICar> {
    return await this.carRepository.save(dto);
  }

  public async update(id: number, dto: CarUpdateDTO): Promise<ICar> {
    const entity = this.getById(id);



  public async get(): Promise<any> {
    return;
  }

  public async getById(id: number): Promise<any> {
    return;
  }

  public async list(): Promise<ICar[]> {
    return await this.carRepository.find();
  }

  public async remove() {
    return;
  }

}
