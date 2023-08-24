import { Injectable } from "@nestjs/common";
import { UserDto } from "./user.dto";
import { UserDao } from "./user.dao";

@Injectable()
export class UserService{
    constructor (private readonly userDao:UserDao){}

    getUsers():Promise<UserDto>{
        return this.userDao.getUsers();
    }
}