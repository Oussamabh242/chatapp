import { ApiProperty } from '@nestjs/swagger';
import { Profile } from 'shared-types';
import { ResponseAPI } from 'src/shared/response.template';
export class CreateUserData extends Profile {
  @ApiProperty({
    description: 'fullName',
    required: true,
    example: 'Jhon Doe',
  })
  fullName: string;

  @ApiProperty({
    description: 'Email',
    required: true,
    example: 'user@example.com',
  })
  email: string;
}

export class CreateUserResponse extends ResponseAPI {
  @ApiProperty({
    description: 'returned data',
    required: false,
    type: CreateUserData,
  })
  data: CreateUserData;
}
