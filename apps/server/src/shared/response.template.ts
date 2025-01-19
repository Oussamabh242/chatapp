import { ApiProperty } from '@nestjs/swagger';

export class ResponseAPI {
  @ApiProperty({
    description: 'Code',
    required: true,
    examples: [0, 1, 2, 3, 4],
  })
  code: number;

  @ApiProperty({
    description: 'Error Message',
    required: false,
  })
  error: string;

  //@ApiProperty({
  //  description: 'returned data',
  //  required: false,
  //})
  //data?: T;
}
