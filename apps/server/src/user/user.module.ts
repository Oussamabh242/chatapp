import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, AuthGuard],
  exports: [UserRepository],
})
export class UserModule {}
