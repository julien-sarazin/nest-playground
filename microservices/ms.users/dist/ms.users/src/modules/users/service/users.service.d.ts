import { User } from '../model/user.entity';
import { UserCreateDTO } from '../dto/create.dto';
import { UserUpdateDTO } from '../dto/update.dto';
import UsersRepository from '../model/user.repository';
import { UserAuthenticateDTO } from '../dto/authenticate.dto';
export default class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    list(criteria: any): Promise<User[]>;
    get(id: number): Promise<User>;
    search(criteria: any): Promise<User>;
    create(dto: UserCreateDTO): Promise<User>;
    update(id: number, dto: UserUpdateDTO): Promise<void>;
    remove(id: number): Promise<void>;
    authenticate(dto: UserAuthenticateDTO): Promise<User>;
}
export declare class UserNotFoundException extends Error {
    constructor(message?: string);
}
export declare class EmailAlreadyExistsException extends Error {
    constructor(message?: string);
}
