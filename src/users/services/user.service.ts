import { Injectable, NotFoundException } from "@nestjs/common";
import { UserResponseDto, UserRequestDto, UserUpdateDto } from "../dto/user.dto";
import { UserDao } from "../dao/user.dao";
import * as bcrypt from 'bcrypt';
import { UserQueryParamsDto, UserSearchDto } from "../dto/user-query-params.dto";
import { instanceToPlain } from "class-transformer";

@Injectable()
export class UserService{
    constructor (private readonly userDao:UserDao){}

    getUsers(query: UserQueryParamsDto): Promise<Array<UserResponseDto>>{
        return this.userDao.getUsers(query);
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

    async updateUser(id: number, payload: UserUpdateDto): Promise<number>{
        const queryParams = new UserQueryParamsDto(); 
        const search = new UserSearchDto(); 
        search.id = +id;
        queryParams.search = search;

        const user = await this.getUsers(queryParams);
        if (user?.length < 1) {
            throw new NotFoundException('User not found');
        }
        payload.updatedAt = (new Date()).valueOf();
        return this.userDao.updateUser(id, payload);
    }
}