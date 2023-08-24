import { Controller, Get } from "@nestjs/common";
import { UserDto } from "./user.dto";
import { UserService } from "./user.service";

@Controller('users')

export class UserController{
    constructor(private readonly userService:UserService) {}

  @Get()
  getAll():Promise<UserDto>{
    return this.userService.getUsers();
  }
}