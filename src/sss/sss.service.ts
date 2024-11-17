import { Injectable } from '@nestjs/common';
import { CreateSssDto } from './dto/create-sss.dto';
import { UpdateSssDto } from './dto/update-sss.dto';

@Injectable()
export class SssService {
  create(createSssDto: CreateSssDto) {
    return 'This action adds a new sss';
  }

  findAll() {
    return `This action returns all sss`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sss`;
  }

  update(id: number, updateSssDto: UpdateSssDto) {
    return `This action updates a #${id} sss`;
  }

  remove(id: number) {
    return `This action removes a #${id} sss`;
  }
}
