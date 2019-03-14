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
import { PatientCreateDTO } from '../dto/create.dto';
import { PatientUpdateDTO } from '../dto/update.dto';
import PatientsService, { PatientNotFoundException } from '../service/patients.service';

@Controller('patients')
export class PatientsController {

  constructor(private readonly patientsService: PatientsService) {
  }

  @Get()
  async list(@Query() query): Promise<any[]> {
    return this.patientsService
      .list(query);
  }

  @Get(':id')
  async get(@Param('id') id): Promise<any> {
    try {
      return await this.patientsService
        .get(id);
    }
    catch (e) {
      return (e instanceof PatientNotFoundException)
        ? new NotFoundException(e.message)
        : new InternalServerErrorException(e);
    }
  }

  @Get()
  async peek(@Query() query): Promise<any> {
    return this.patientsService
      .peek(query);
  }

  @Post()
  // Joi alternative: @UsePipes(new JoiValidationPipe(PatientCreateDTO.Schema()))
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createPatientDTO: PatientCreateDTO) {
    return await this.patientsService
      .create(createPatientDTO);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id, @Body() updatePatientDTO: PatientUpdateDTO) {
    return {};
  }

  @Delete()
  async remove(@Param('id') id) {
    return this.patientsService
      .remove(id);
  }
}
