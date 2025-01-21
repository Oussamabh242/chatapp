import {
  Controller,
  UseGuards,
  Post,
  Body,
  Request,
  Get,
  Put,
  Param,
  Req,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ReqResponseDto, RequestReq } from './dto/respond.dto';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  //@ApiProperty({
  //  description: 'send request',
  //  type: ,
  //})
  makeRequest(@Body() reciver: RequestReq, @Request() req) {
    try {
      return this.requestService.sendRequest(reciver.reciver, req.user);
    } catch {
      return 'something wrong happend while sneding a request';
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getAllRequest(@Request() req) {
    const x = await this.requestService.getRequests(req.user);
    return x;
  }

  @Put()
  @UseGuards(AuthGuard)
  respondRequest(@Body() response: ReqResponseDto, @Request() req) {
    return this.requestService.handleResponse(response, req.user);
  }

  @Get('search/:name')
  @UseGuards(AuthGuard)
  getFriends(@Param('name') name: string, @Request() req) {
    console.log('here');
    if (!name || !name.trim()) {
      console.log('something');
    }
    return this.requestService.getUsersByName(name, req.user);
  }
}
