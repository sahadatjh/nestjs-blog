import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UserDto{
    @IsNumber()
    id: number;

    @IsString()
    username: string;

    @IsString()
    email: string;

    @IsString()
    password: string;
}

export class UserRequestDto{
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsString()
    first_name: string;

    @IsOptional()
    @IsString()
    last_name: string;

    @IsOptional()
    @IsString()
    username: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsOptional()
    @IsNumber()
    created_at?: number;

    @IsOptional()
    @IsNumber()
    updated_at?: number;
}