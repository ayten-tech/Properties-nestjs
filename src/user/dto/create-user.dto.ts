import { IsString, IsEmail, IsInt, IsOptional, MinLength, MaxLength,IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsInt()
  @Type(() => Number) // Transform the incoming value to a number
  age: number;

  @IsOptional()
  @IsString()
  address?: string;

  
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, { message: 'Password must be at most 20 characters long' })
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;
}