import { Injectable } from "@nestjs/common";
import { UserDto, UserRequestDto } from "./user.dto";
import { UserDao } from "./user.dao";

@Injectable()
export class UserService{
    constructor (private readonly userDao:UserDao){}

    getUsers(): Promise<UserDto>{
        return this.userDao.getUsers();
    }

    createUser(payload: UserRequestDto): Promise<boolean>{
        return this.userDao.createUser(payload)
    }
}