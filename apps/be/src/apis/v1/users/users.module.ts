import { Module } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { UsersService } from "#be/apis/v1/users/users.service";
import { UsersController } from "#be/apis/v1/users/users.controller";

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
