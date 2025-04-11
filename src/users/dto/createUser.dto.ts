import { IsEmail, IsOptional, IsString } from 'class-validator';

export class createUserDto {
  @IsString()
  username: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  avatar_url?: string;

  @IsEmail()
  email: string;
}
