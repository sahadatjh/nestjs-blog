import { Controller, Get } from "@nestjs/common";
import { UserDto } from "./user.dto";

@Controller('users')

export class UserController{
    constructor() {}

  @Get()
  getAll():UserDto{

    return {id:1, name: 'sahadat', email: 'sahadatjh@gmail.com', password: 'ERTYHhgk'};
  }

}