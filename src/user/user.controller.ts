import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserDto, UserRequestDto } from "./user.dto";
import { UserService } from "./user.service";

@Controller('users')

export class UserController{
    constructor(private readonly userService:UserService) {}

  @Get()
  getAll():Promise<UserDto>{
    return this.userService.getUsers();
  }

  @Post()
  createUser(@Body() payload:UserRequestDto): Promise<boolean>{
    return this.userService.createUser(payload);
  }
}