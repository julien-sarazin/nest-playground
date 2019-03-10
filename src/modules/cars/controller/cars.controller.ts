import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarCreateDTO } from '../dto/create.dto';
import { CarUpdateDTO } from '../dto/update.dto';
import { CarsService } from '../service/cars.service';
import { JoiValidationPipe } from '../../../pipes/joi-validator.pipe';
import { Roles } from '../../../decorators/roles.decorator';

@Controller('cars')
export class CarsController {

  constructor(private readonly carsService: CarsService) {}

  @Get()
  async find(@Query() query): Promise<any[]> {
    return this.carsService.find();
  }

  @Get()
  async findOne(@Param() query): Promise<any> {
    return this.carsService.find()[0];
  }

  @Get(':id')
  async findById(@Param() params): Promise<any> {
    return {};
  }

  @Post()
  @Roles('admin')
  @UsePipes(new JoiValidationPipe(CarCreateDTO.Schema()))
  async create(@Body() createCarDTO: CarCreateDTO) {
    return {};
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true}))
  async update(@Param('id') id, @Body() updateCarDTO: CarUpdateDTO) {
    return {};
  }

  @Delete()
  async remove(@Param('id') id) {
    return {};
  }

  @Post(':id')
  @HttpCode(200)
  async rent(@Param('id') id): Promise<void> {
    return;
  }
}
