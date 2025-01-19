import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

/*
  ========================================================================
                          TYPE DEFINITIONS
  ========================================================================
*/
type singInReturn_t = {
  /*
   * This defines the return type of the Signin Method
   */
  code: number;
  message: string;
  accessToken?: string;
};

export type profileReturn_t = {
  code: number;
  message: string;
  profile?: {
    fullName: string;
    email: string;
  };
};

/*
  ========================================================================
                          END TYPE DEFINITIONS
  ========================================================================
*/

@Injectable()
export class AuthService {
  constructor(
    private readonly userPrisma: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async singIn(user: SigninDto): Promise<singInReturn_t> {
    const userDb = await this.userPrisma.getByEmail(user.email);
    if (!userDb) {
      return {
        code: 401,
        message: 'Invalid Credentials',
      };
    }

    if (userDb.password != user.password) {
      return {
        code: 401,
        message: 'Invalid Credentials',
      };
    }
    const payload = { uid: userDb.id };

    return {
      code: 201,
      message: 'logged',
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async profile(id: string): Promise<profileReturn_t> {
    try {
      const user = await this.userPrisma.getById(id);
      return {
        code: 200,
        message: '',
        profile: user,
      };
    } catch {
      return {
        code: 404,
        message: '',
      };
    }
  }
}
