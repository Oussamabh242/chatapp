import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  sendMessage(
    @Body() message: { chatid: string; text: string },
    @Request() req,
  ) {
    return this.messagesService.sendMessage(message, req.user);
  }

  @Get(':id')
  getAllMessages(@Param('id') id: string, @Request() req) {
    const userid = req.user;
    //console.log(userid)
    return this.messagesService.getMessages(id, userid);
  }
}
