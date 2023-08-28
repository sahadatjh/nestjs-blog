import { Injectable } from "@nestjs/common";
import { UserDto } from "./user.dto";
import { DatabaseService } from "../shared/services/database.service";
import * as knexnest from 'knexnest';
import {plainToClass} from "class-transformer";

@Injectable()
export class UserDao{
    constructor(private readonly databaseService: DatabaseService){}

    async getUsers(): Promise<UserDto>{
        const db = await this.databaseService.getConnection();
        const sql = db.select('u.id AS _id', 'u.name AS _name', 'u.email AS _email', 'u.password AS _password').from('users AS u');
        return knexnest(sql).then(data => plainToClass(UserDto, data));
    }
}