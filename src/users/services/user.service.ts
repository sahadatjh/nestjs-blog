import { Injectable } from "@nestjs/common";
import { UserResponseDto, UserRequestDto } from "../dto/user.dto";
import { UserDao } from "../dao/user.dao";
import * as bcrypt from 'bcrypt';
import { UserQueryParamsDto } from "../dto/user-query-params.dto";

@Injectable()
export class UserService{
    constructor (private readonly userDao:UserDao){}

    getUsers(query: UserQueryParamsDto): Promise<Array<UserResponseDto>>{
        return this.userDao.getUsers(query);
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