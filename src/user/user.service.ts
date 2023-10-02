import { Injectable } from "@nestjs/common";
import { UserDto, UserRequestDto } from "./user.dto";
import { UserDao } from "./user.dao";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService{
    constructor (private readonly userDao:UserDao){}

    getUsers(): Promise<UserDto>{
        return this.userDao.getUsers();
    }

    async getUserByUsernameOrEmail(){

        return null;
    }

    async createUser(payload: UserRequestDto): Promise<boolean>{
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(salt+payload?.password+salt, salt);
        delete payload?.password;
        payload["password"] = hash; 
        const current_time = (new Date()).valueOf();
        payload["created_at"] = current_time; 
        payload["updated_at"] = current_time; 
        return this.userDao.createUser(payload);
    }
}