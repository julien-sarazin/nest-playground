import { Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {

  }

  @Get('one')
  async get(@Query() query): Promise<any> {
    return;
  }

  @Get(':id')
  async getById(@Param() params): Promise<any> {
    return;
  }

  @Get()
  async list(@Query() query): Promise<any[]> {
    return [];
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(): Promise<any> {
    return {};
  }

  @Put()
  @UsePipes(new ValidationPipe({ transform: true }))
  async update() {
    return {};
  }

  @Delete()
  async remove() {
    return;
  }
}
