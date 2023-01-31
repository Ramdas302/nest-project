import { SignupLoginService } from '../signup-login/signup-login.service';
import { UsersDTO } from './users.dto';
export declare class SignupLoginController {
    private usersService;
    constructor(usersService: SignupLoginService);
    createUsers(data: UsersDTO, res: any): Promise<void>;
    loginUsers(data: UsersDTO, res: any): Promise<void>;
    randomjoke(req: any, res: any): Promise<void>;
    readUser(req: any, res: any): Promise<void>;
    refreshtoken(req: any, res: any): Promise<void>;
    logout(req: any, res: any): Promise<void>;
}
