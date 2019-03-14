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
import { CredentialCreateDTO } from '../dto/create.dto';
import { CredentialUpdateDTO } from '../dto/update.dto';
import CredentialsService, { CredentialNotFoundException } from '../service/credentials.service';

@Controller('credentials')
export class CredentialsController {

  constructor(private readonly credentialsService: CredentialsService) {
  }

  @Get()
  async list(@Query() query): Promise<any[]> {
    return this.credentialsService
      .list(query);
  }

  @Get(':id')
  async get(@Param('id') id): Promise<any> {
    try {
      return await this.credentialsService
        .get(id);
    }
    catch (e) {
      return (e instanceof CredentialNotFoundException)
        ? new NotFoundException(e.message)
        : new InternalServerErrorException(e);
    }
  }

  @Get()
  async peek(@Query() query): Promise<any> {
    return this.credentialsService
      .peek(query);
  }

  @Post()
  // Joi alternative: @UsePipes(new JoiValidationPipe(CredentialCreateDTO.Schema()))
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createCredentialDTO: CredentialCreateDTO) {
    return await this.credentialsService
      .create(createCredentialDTO);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id, @Body() updateCredentialDTO: CredentialUpdateDTO) {
    return this.credentialsService
      .update(id, updateCredentialDTO);
  }

  @Delete()
  async remove(@Param('id') id) {
    return this.credentialsService
      .remove(id);
  }
}
