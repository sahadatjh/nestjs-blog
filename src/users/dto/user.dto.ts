import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";

export class UserResponseDto{
    @IsNumber()
    id: number;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    username: string;

    @IsString()
    email: string;

    @IsString()
    password: string;
}

export class UserRequestDto{
    @IsOptional()
    @IsString()
    @Length(2, 50)
    first_name?: string;

    @IsOptional()
    @IsString()
    @Length(2, 50)
    last_name?: string;

    @IsOptional()
    @MinLength(2)
    @IsString()
    @Length(2, 50)
    username?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    email?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsNumber()
    created_at?: number;

    @IsOptional()
    @IsNumber()
    updated_at?: number;
}
