import { ApiProperty } from '@nestjs/swagger';
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

export class RequestReq {
  @ApiProperty({
    description: 'request Reciver',
    required: true,
  })
  reciver: string;
}
