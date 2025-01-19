import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsBoolean,
} from 'class-validator';
export class ReqResponseDto {
  @IsString()
  @IsNotEmpty()
  reqid: string;

  @IsBoolean()
  @IsNotEmpty()
  response: boolean;
}
