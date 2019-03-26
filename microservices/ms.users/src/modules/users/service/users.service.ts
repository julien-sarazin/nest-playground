import { Inject, Injectable } from '@nestjs/common';
import { User } from '../model/user.entity';
import { UserCreateDTO } from '../dto/create.dto';
import { UserUpdateDTO } from '../dto/update.dto';
import UsersRepository from '../model/user.repository';
import { compare, hash } from 'bcrypt';
import { UserAuthenticateDTO } from '../dto/authenticate.dto';

@Injectable()
export default class UsersService {

  constructor(
    @Inject('UsersRepository') private readonly usersRepository: UsersRepository,
  ) {
  }

  public async list(criteria): Promise<User[]> {
    return await this.usersRepository
      .find(criteria);
  }

  public async get(id: number): Promise<User> {
    const entity = await this.usersRepository
      .findOne(id);

    if (!entity) {
      throw new UserNotFoundException();
    }

    return entity;
  }

  public async peek(criteria): Promise<User> {
    return await this.usersRepository
      .findOne(criteria);
  }

  public async create(dto: UserCreateDTO): Promise<User> {
    let user = await this.usersRepository
      .findOne({ email: dto.email });

    if (user) {
      throw new EmailAlreadyExistsException('Email already used.');
    }

    user = Object.assign(new User(), dto);
    user.password = await hash(dto.password, 10);

    return await this.usersRepository
      .save(user);
  }

  public async update(id: number, dto: UserUpdateDTO): Promise<void> {
    let user = await this.usersRepository
      .findOne(id);

    if (!user) {
      throw new UserNotFoundException(`No user with the identifier ${id}`);
    }

    user = Object.assign(user, dto);

    await this.usersRepository
      .save(user);
  }

  public async remove(id: number): Promise<void> {
    const entity = await this.usersRepository
      .findOne(id);

    if (!entity) {
      throw new UserNotFoundException(`No user with the identifier ${id}`);
    }

    await this.usersRepository
      .remove(entity);
  }

  public async authenticate(dto: UserAuthenticateDTO): Promise<User> {
    const user = await this.usersRepository
      .findOne({
        select: ['id', 'email', 'password'],
        where: {
          email: dto.email,
        },
      });

    if (!user) {
      throw new UserNotFoundException();
    }

    const same = await compare(dto.password, user.password);

    if (same) {
      delete user.password;
      delete user.email;
      return user;
    }

    throw new UserNotFoundException();
  }
}

export class UserNotFoundException extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class EmailAlreadyExistsException extends Error {
  constructor(message?: string) {
    super(message);
  }
}
