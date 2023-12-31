import { Expose, Transform } from "class-transformer";
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
    @Expose({name: 'first_name', toPlainOnly: true})
    firstName?: string;

    @IsOptional()
    @IsString()
    @Length(2, 50)
    @Expose({name: 'last_name', toPlainOnly: true})
    lastName?: string;

    @IsString()
    @Length(2, 50)
    username: string;

    @IsString()
    @MaxLength(50)
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    password: string;

    @IsOptional()
    @IsNumber()
    @Expose({name: 'created_at', toPlainOnly: true})
    createdAt?: number;
}

export class UserUpdateDto{
    @IsOptional()
    @IsString()
    @Length(2, 50)
    @Expose({name: 'first_name', toPlainOnly: true})
    firstName?: string;

    @IsOptional()
    @IsString()
    @Length(2, 50)
    @Expose({name: 'last_name', toPlainOnly: true})
    lastName?: string;

    @IsOptional()
    @IsNumber()
    @Expose({name: 'updated_at', toPlainOnly: true})
    updatedAt?: number;
}