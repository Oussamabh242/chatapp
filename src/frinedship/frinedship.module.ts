import { Module } from '@nestjs/common';
import { FrinedshipService } from './frinedship.service';
import { FrinedshipController } from './frinedship.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { RedisModule } from 'src/redis/redis.module';
import { RedisService } from 'src/redis/redis.service';
@Module({
  imports: [AuthModule, PrismaModule, RedisModule],
  controllers: [FrinedshipController],
  providers: [FrinedshipService, PrismaService, RedisService],
})
export class FrinedshipModule {}
