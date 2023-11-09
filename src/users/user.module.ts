import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserDao } from './dao/user.dao';

@Module({
    imports:[],
    controllers:[UserController],
    providers:[
        UserService,
        UserDao
    ]
})
export class UserModule {}
