import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import TokensService, { TokenNotFoundException } from '../service/tokens.service';
import { CreateTokensDTO } from '../dto/create.dto';

@Controller('tokens')
export class TokensController {

  constructor(private readonly tokensService: TokensService) {
  }

  @Get()
  async list(@Query() query): Promise<any[]> {
    return this.tokensService
      .list(query);
  }

  @Get(':id')
  async get(@Param('id') id): Promise<any> {
    try {
      return await this.tokensService
        .get(id);
    }
    catch (e) {
      return (e instanceof TokenNotFoundException)
        ? new NotFoundException(e.message)
        : new InternalServerErrorException(e);
    }
  }

  @Get('peek')
  async peek(@Query() query): Promise<any> {
    return this.tokensService
      .peek(query);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createTokenDTO: CreateTokensDTO) {
    return await this.tokensService
      .create(createTokenDTO);
  }

  @Delete()
  async remove(@Param('id') id) {
    return this.tokensService
      .remove(id);
  }
}
