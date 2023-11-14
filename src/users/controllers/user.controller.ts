import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserQueryParamsDto } from "../dto/user-query-params.dto";
import { UserResponseDto, UserRequestDto, UserUpdateDto } from "../dto/user.dto";
import { LoggerService } from "../../shared/services/logger.service";
import { ResponseTransformerInterceptor } from "../../common/interceptors/response-transformer.interceptor";

@Controller('users')
@UseInterceptors(ResponseTransformerInterceptor)

export class UserController{
    constructor(private readonly userService: UserService,
                private readonly loggerService: LoggerService) {}

  @Get()
  getAll(@Query(new ValidationPipe({ transform: true })) query: UserQueryParamsDto):Promise<Array<UserResponseDto>>{
    try {
      return this.userService.getUsers(query);
    } catch (e) {
      this.loggerService.error(`Failed to load users: ${e?.message}`, e?.stack, UserController?.name);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e?.message
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post()
  createUser(@Body() payload: UserRequestDto): Promise<boolean>{
    try {
      return this.userService.createUser(payload);
    } catch (e) {
      this.loggerService.error(`Failed to create users: ${e?.message}`, e?.stack, UserController?.name);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e?.message
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Put('/:id')
  updateUser(@Param('id') id: number, @Body() reqBody: UserUpdateDto): Promise<number>{
    try {
      return this.userService.updateUser(id, reqBody);
    } catch (e) {
      this.loggerService.error(`Failed to update users: ${e?.message}`, e?.stack, UserController?.name);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e?.message
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}