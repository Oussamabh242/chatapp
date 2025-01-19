import {
  Controller,
  Post,
  Body,
  Put,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserResponse } from './dto/Responses.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'User Created successfully',
    type: CreateUserResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'entered Credentials are wrong',
    type: CreateUserResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'An error Happend in the server',
  })
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    const resp = await this.userService.create(createUserDto);
    return res.status(resp.code).json(resp);
  }

  @Put()
  @UseGuards(AuthGuard)
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user, updateUserDto);
  }
}
