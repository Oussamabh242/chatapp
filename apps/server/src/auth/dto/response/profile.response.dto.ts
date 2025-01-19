import { ApiProperty } from '@nestjs/swagger';
import { Profile, ProfileResponse } from 'shared-types';
export class ProfileAPI extends Profile {
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

export class ProfileResponseAPI extends ProfileResponse {
  @ApiProperty({
    description: 'User Profile',
    required: false,
    type: Profile,
  })
  profile?: Profile;
  @ApiProperty({
    description: 'message',
    required: false,
    example: 'User Not found',
  })
  message?: string;
}
