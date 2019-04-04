import UsersService from '../service/users.service';
import { UserCreateDTO } from '../dto/create.dto';
import { UserUpdateDTO } from '../dto/update.dto';
import { UserAuthenticateDTO } from '../dto/authenticate.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    list(criteria: any): Promise<any[]>;
    get(id: any): Promise<any>;
    peek(criteria: any): Promise<any>;
    create(userCreateDTO: UserCreateDTO): Promise<any>;
    update(id: any, userUpdateDTO: UserUpdateDTO): Promise<any>;
    remove(id: any): Promise<any>;
    authenticate(authenticateDTO: UserAuthenticateDTO, res: any): Promise<any>;
}
