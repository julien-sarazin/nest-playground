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
  Query, UnprocessableEntityException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DiagnosticCreateDTO } from '../dto/create.dto';
import { DiagnosticUpdateDTO } from '../dto/update.dto';
import DiagnosticsService, { DiagnosticNotFoundException } from '../service/diagnostics.service';
import PatientsService from '../../patients/service/patients.service';
import PractitionersService from '../../practitioners/service/practitioners.service';

@Controller('diagnostics')
export class DiagnosticsController {

  constructor(
    private readonly diagnosticsService: DiagnosticsService,
    private readonly patientsService: PatientsService,
    private readonly practitionersService: PractitionersService,
  ) {
  }

  @Get()
  async list(@Query() query): Promise<any[]> {
    return this.diagnosticsService
      .list(query);
  }

  @Get(':id')
  async get(@Param('id') id): Promise<any> {
    try {
      return await this.diagnosticsService
        .get(id);
    }
    catch (e) {
      return (e instanceof DiagnosticNotFoundException)
        ? new NotFoundException(e.message)
        : new InternalServerErrorException(e);
    }
  }

  @Get()
  async peek(@Query() query): Promise<any> {
    return this.diagnosticsService
      .peek(query);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createDiagnosticDTO: DiagnosticCreateDTO) {
    const patient = await this.patientsService
      .peek({ practitionerId: createDiagnosticDTO.practitionerId });

    if (!patient) {
      throw new UnprocessableEntityException();
    }

    return await this.diagnosticsService
      .create(createDiagnosticDTO);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id, @Body() updateDiagnosticDTO: DiagnosticUpdateDTO) {
    return this.diagnosticsService
      .update(id, updateDiagnosticDTO);
  }

  @Delete()
  async remove(@Param('id') id) {
    return this.diagnosticsService
      .remove(id);
  }
}
