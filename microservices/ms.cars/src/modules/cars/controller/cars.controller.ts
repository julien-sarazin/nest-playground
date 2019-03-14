import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarCreateDTO } from '../dto/create.dto';
import { CarUpdateDTO } from '../dto/update.dto';
import CarsService, { CarNotFoundException } from '../service/cars.service';

@Controller('cars')
export class CarsController {

  constructor(private readonly carsService: CarsService) {
  }

  @Get()
  async list(@Query() query): Promise<any[]> {
    return this.carsService
      .list(query);
  }

  @Get(':id')
  async get(@Param('id') id): Promise<any> {
    try {
      return await this.carsService
        .get(id);
    }
    catch (e) {
      return (e instanceof CarNotFoundException)
        ? new NotFoundException(e.message)
        : new InternalServerErrorException(e);
    }
  }

  @Get()
  async peek(@Query() query): Promise<any> {
    return this.carsService
      .peek(query);
  }

  @Post()
  // Joi alternative: @UsePipes(new JoiValidationPipe(CarCreateDTO.Schema()))
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createCarDTO: CarCreateDTO) {
    return await this.carsService
      .create(createCarDTO);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id, @Body() updateCarDTO: CarUpdateDTO) {
    return {};
  }

  @Delete()
  async remove(@Param('id') id) {
    return this.carsService
      .remove(id);
  }
}
