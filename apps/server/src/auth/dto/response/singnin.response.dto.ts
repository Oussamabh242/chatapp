import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SignInResponse } from 'shared-types';

export class SignInResponseAPI extends SignInResponse {
  @ApiProperty({
    description: 'message',
    required: true,
    examples: ['logged in', 'Invalid Credentials'],
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Access Token',
    required: false,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJjbTJzNzI1MTIwMDAwNml3a2R5em14amNuIiwiaWF0IjoxNzM3MTU4NjkwLCJleHAiOjE3MzcyNDUwOTB9.YVScmd9E9luklAStZ_C1Emf1N6QKENt04uR_IRBHdLg',
  })
  accessToken?: string;
}
