import { Expose, Transform, Type } from "class-transformer";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class UserSortDto{
    @IsNotEmpty()
    @IsIn(['asc', 'desc'])
    type: string;

    @IsNotEmpty()
    @IsIn([
        'id',
        'firstName',
        'username',
        'email'
    ])
    field: string;
}

export class UserSearchDto{
    @IsOptional()
    @IsNumber()
    @Transform(raw=> +raw?.value)
    id?: number;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    username: string;
}

export class UserPaginationDto{
    @IsOptional()
    @IsNumber()
    @Transform(raw=> +raw?.value)
    offset?: number;

    @IsOptional()
    @IsNumber()
    @Transform(raw=> +raw?.value)
    limit?: number;
    
}

export class UserQueryParamsDto{
    @IsOptional()
    @ValidateNested()
    @Type(()=> UserSortDto)
    sort?: UserSortDto;

    @IsOptional()
    @ValidateNested()
    @Type(()=> UserSearchDto)
    search?: UserSearchDto;

    @IsOptional()
    @ValidateNested()
    @Type(()=> UserPaginationDto)
    pagination?: UserPaginationDto;
}