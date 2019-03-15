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
import { PractitionerCreateDTO } from '../dto/create.dto';
import { PractitionerUpdateDTO } from '../dto/update.dto';
import PractitionersService, { PractitionerNotFoundException } from '../service/practitioners.service';

@Controller('practitioners')
export class PractitionersController {

  constructor(private readonly practitionersService: PractitionersService) {
  }

  @Get()
  async list(@Query() query): Promise<any[]> {
    return this.practitionersService
      .list(query);
  }

  @Get(':id')
  async get(@Param('id') id): Promise<any> {
    try {
      return await this.practitionersService
        .get(id);
    }
    catch (e) {
      return (e instanceof PractitionerNotFoundException)
        ? new NotFoundException(e.message)
        : new InternalServerErrorException(e);
    }
  }

  @Get()
  async peek(@Query() query): Promise<any> {
    return this.practitionersService
      .peek(query);
  }

  @Post()
  // Joi alternative: @UsePipes(new JoiValidationPipe(PractitionerCreateDTO.Schema()))
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createPractitionerDTO: PractitionerCreateDTO) {
    return await this.practitionersService
      .create(createPractitionerDTO);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id, @Body() updatePractitionerDTO: PractitionerUpdateDTO) {
    return this.practitionersService
      .update(id, updatePractitionerDTO);
  }

  @Delete()
  async remove(@Param('id') id) {
    return this.practitionersService
      .remove(id);
  }
}
