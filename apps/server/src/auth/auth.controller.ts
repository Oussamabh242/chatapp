import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  InternalServerErrorException,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { AuthGuard } from './auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { SignInResponseAPI } from './dto/response/singnin.response.dto';
import { ProfileResponseAPI } from './dto/response/profile.response.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiCreatedResponse({
    description: 'logged in successfully',
    type: SignInResponseAPI,
  })
  @ApiUnauthorizedResponse({
    description: 'entered Credentials are wrong',
    type: SignInResponseAPI,
  })
  @ApiInternalServerErrorResponse({
    description: 'An error Happend in the server',
  })
  async Signin(@Body() user: SigninDto, @Res() res: Response) {
    console.log('something in here sisfslakfa;ljfd;fja;');
    try {
      const resp = await this.authService.singIn(user);

      res.status(resp.code).json({ ...resp, code: null });
    } catch (err) {
      console.error(err);
      return new InternalServerErrorException('Something Went wrong');
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'retrieving the lgged in User data',
    type: ProfileResponseAPI,
  })
  async profile(@Req() req, @Res() res: Response) {
    try {
      const resp = await this.authService.profile(req.user);
      return res.status(resp.code).json({
        ...resp,
        code: null,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: 'internal Server error',
        message: 'something went wrong',
      });
    }
  }
}
