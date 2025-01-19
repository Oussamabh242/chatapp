import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class SigninDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
