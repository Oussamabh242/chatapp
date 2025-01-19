import { PartialType } from '@nestjs/mapped-types';
import { CreateSssDto } from './create-sss.dto';

export class UpdateSssDto extends PartialType(CreateSssDto) {
  id: number;
}
