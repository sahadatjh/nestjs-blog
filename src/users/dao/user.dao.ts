import { Injectable } from "@nestjs/common";
import { UserResponseDto, UserRequestDto } from "../dto/user.dto";
import { DatabaseService } from "../../shared/services/database.service";
import * as knexnest from 'knexnest';
import {plainToClass} from "class-transformer";
import { UserQueryParamsDto } from "../dto/user-query-params.dto";

@Injectable()
export class UserDao{
    constructor(private readonly databaseService: DatabaseService){}

    async getUsers(query: UserQueryParamsDto): Promise<Array<UserResponseDto>>{
        console.log('\nQuery------------>',query);
        const db = await this.databaseService.getConnection();
        const sql = db.select(
            'u.id AS _id', 
            'u.first_name AS _firstName', 
            'u.last_name AS _lastName', 
            'u.username AS _username', 
            'u.email AS _email', 
            'u.password AS _password'
            ).from('users AS u');
        return knexnest(sql).then(data => plainToClass(UserResponseDto, data));
    }

    async createUser(user:UserRequestDto): Promise<boolean>{
        const db = await this.databaseService.getConnection();
        return db.insert(user).returning('id').into('users');
    }
}