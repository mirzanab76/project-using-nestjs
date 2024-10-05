import { IsString, IsNotEmpty, MinLength, Min, IsInt } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export enum UserRole {
  ADMIN = 'Admin',
  USER = 'User',
  MANAGER = 'Manager',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  name: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  @Transform(({ value }) => {
    if (value === '') {
      return undefined;
    }
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
      return undefined;
    }
    return parsed;
  })
  role_id: number;
}