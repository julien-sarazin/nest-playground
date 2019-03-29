import {
  Body, ConflictException,
  Controller,
  Delete,
  Get, HttpStatus, InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import UsersService, { EmailAlreadyExistsException, UserNotFoundException } from '../service/users.service';
import { UserCreateDTO } from '../dto/create.dto';
import { UserUpdateDTO } from '../dto/update.dto';
import { Criteria } from '../../../decorators/criteria.decorator';
import { UserAuthenticateDTO } from '../dto/authenticate.dto';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {
  }

  @Get()
  public async list(@Criteria() criteria): Promise<any[]> {
    return this.usersService
      .list(criteria);
  }

  @Get(':id')
  public async get(@Param('id') id): Promise<any> {
    try {
      return await this.usersService
        .get(id);
    }
    catch (e) {
      throw (e instanceof UserNotFoundException)
        ? new NotFoundException(e.message)
        : new InternalServerErrorException(e);
    }
  }

  @Get('peek')
  public async peek(@Criteria() criteria): Promise<any> {
    return this.usersService
      .peek(criteria);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async create(@Body() userCreateDTO: UserCreateDTO): Promise<any> {
    try {
      await this.usersService
        .create(userCreateDTO);
    }
    catch (e) {
      throw (e instanceof EmailAlreadyExistsException)
        ? new ConflictException(e.message)
        : new InternalServerErrorException(e);
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async update(@Param('id') id, @Body() userUpdateDTO: UserUpdateDTO): Promise<any> {
    try {
      await this.usersService
        .update(id, userUpdateDTO);
    }
    catch (e) {
      throw (e instanceof UserNotFoundException)
        ? new NotFoundException(e.message)
        : new InternalServerErrorException(e);
    }
  }

  @Delete(':id')
  public async remove(@Param('id') id): Promise<any> {
    try {
      await this.usersService
        .remove(id);
    }
    catch (e) {
      throw (e instanceof UserNotFoundException)
        ? new NotFoundException(e.message)
        : new InternalServerErrorException(e);
    }
  }

  @Post('authenticate')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async authenticate(@Body() authenticateDTO: UserAuthenticateDTO, @Res() res): Promise<any> {
    try {
      const authenticated = await this.usersService
        .authenticate(authenticateDTO);

      return res
        .status(HttpStatus.OK)
        .send(authenticated);
    }
    catch (e) {
      throw (e instanceof UserNotFoundException)
        ? new NotFoundException(e.message)
        : new InternalServerErrorException(e);
    }
  }
}
