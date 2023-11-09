import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, ValidationPipe } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserQueryParamsDto } from "../dto/user-query-params.dto";
import { UserResponseDto, UserRequestDto } from "../dto/user.dto";
// import { LoggerService } from "../../shared/services/logger.service";

@Controller('users')

export class UserController{
    constructor(private readonly userService: UserService) {}

  @Get()
  getAll(@Query(new ValidationPipe({ transform: true })) query: UserQueryParamsDto):Promise<Array<UserResponseDto>>{
    try {
      return this.userService.getUsers(query);
    } catch (e) {
      // this.loggerService.error(`Failed to load users: ${e?.message}`, e?.stack, UserController?.name);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e?.message
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post()
  createUser(@Body() payload: UserRequestDto): Promise<boolean>{
    return this.userService.createUser(payload);
  }
}