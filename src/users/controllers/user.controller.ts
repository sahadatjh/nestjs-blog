import { Body, Controller, Get, Post, Query, ValidationPipe } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserQueryParamsDto } from "../dto/user-query-params.dto";
import { UserResponseDto, UserRequestDto } from "../dto/user.dto";

@Controller('users')

export class UserController{
    constructor(private readonly userService:UserService) {}

  @Get()
  getAll(@Query(new ValidationPipe({ transform: true })) query: UserQueryParamsDto):Promise<Array<UserResponseDto>>{

    return this.userService.getUsers(query);
  }

  @Post()
  createUser(@Body() payload: UserRequestDto): Promise<boolean>{
    return this.userService.createUser(payload);
  }
}