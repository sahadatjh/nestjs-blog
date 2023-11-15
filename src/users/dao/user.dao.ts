import { Injectable } from "@nestjs/common";
import { UserResponseDto, UserRequestDto, UserUpdateDto } from "../dto/user.dto";
import { DatabaseService } from "../../shared/services/database.service";
import * as knexnest from 'knexnest';
import {instanceToPlain, plainToClass} from "class-transformer";
import { UserQueryParamsDto, UserSortDto } from "../dto/user-query-params.dto";

@Injectable()
export class UserDao{
    constructor(private readonly databaseService: DatabaseService){}

    async getUsers(query: UserQueryParamsDto): Promise<Array<UserResponseDto>>{
        const db = await this.databaseService.getConnection();
        const sortFieldmap = {
            'id'        : 'u.id',
            'firstName' : 'u.first_name',
            'lastName'  : 'u.last_name',
            'email'     : 'u.email',
            'username'  : 'u.username'
        }

        const userQuerySort = new UserSortDto();
        userQuerySort.field = sortFieldmap[query?.sort?.field] !== undefined ? sortFieldmap[query?.sort?.field] : sortFieldmap['id'];
        userQuerySort.type = query?.sort?.type === 'desc' ? 'desc' : 'asc';
        query.sort = userQuerySort;

        const sql = db.select(
            'u.id AS _id', 
            'u.first_name AS _firstName', 
            'u.last_name AS _lastName', 
            'u.username AS _username', 
            'u.email AS _email', 
            'u.password AS _password'
            ).from('users AS u');

        if (query?.sort) {
            sql.orderBy(query?.sort?.field, query?.sort?.type);
        }

        if (query?.search?.id) {
            sql.where('u.id', +query?.search?.id);
        }
        if (query?.search?.email) {
            sql.where('u.email', query?.search?.email);
        }
        if (query?.search?.username) {
            sql.where('u.username', query?.search?.username);
        }

        if (query?.pagination?.offset) {
            sql.offset(query?.pagination?.offset);
        }

        if (query?.pagination?.limit) {
            sql.limit(query?.pagination?.limit);
        }

        return knexnest(sql).then(data => plainToClass(UserResponseDto, data ? data : []));
    }

    async createUser(user:UserRequestDto): Promise<boolean>{
        const db = await this.databaseService.getConnection();
        return db.insert(instanceToPlain(user)).returning('id').into('users');
    }

    async updateUser(id: number, payload: UserUpdateDto): Promise<number>{
        const db = await this.databaseService.getConnection();
        return db.update(instanceToPlain(payload)).where('id', +id).returning('id').into('users');
    }
}