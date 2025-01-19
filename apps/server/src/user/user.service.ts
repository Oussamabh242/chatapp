import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { ServiceReturn_t } from 'src/shared/service.return';
import { CreateUserData } from './dto/Responses.dto';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(
    createUserDto: CreateUserDto,
  ): Promise<ServiceReturn_t<CreateUserData>> {
    try {
      const user = await this.userRepository.create(createUserDto);
      return {
        code: 201,
        data: user,
      };
    } catch (err) {
      console.error(err);
      return {
        code: 500,
        error: '[Server Error] something went wrong',
      };
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.update(id, updateUserDto);
      return 'user name changed to ' + user.fullName;
    } catch (err) {
      console.log(err);
      return 'error occured when updateing user';
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
