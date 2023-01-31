import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { UsersDTO } from './users.dto';
import { JwtService } from '@nestjs/jwt';
export declare class SignupLoginService {
    private usersRepository;
    private readonly jwtService;
    constructor(usersRepository: Repository<UsersEntity>, jwtService: JwtService);
    create(data: UsersDTO): Promise<{
        first_name: string;
        last_name: string;
        email: string;
        password: any;
    } & UsersEntity>;
    login(data: UsersDTO, res: any): Promise<any>;
    randomjoke(req: any, res: any): Promise<any>;
    getuser(req: any, res: any): Promise<false | UsersEntity>;
    logout(req: any, res: any): Promise<boolean>;
    refreshtoken(req: any, res: any): Promise<boolean>;
}
