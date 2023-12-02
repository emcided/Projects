import { IsEmail, IsNumber, IsString, isNumber } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
