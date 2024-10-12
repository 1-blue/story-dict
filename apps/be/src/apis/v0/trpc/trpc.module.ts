import { Module } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { TrpcController } from "#be/apis/v0/trpc/trpc.controller";
import { TrpcService } from "#be/apis/v0/trpc/trpc.service";
import { TrpcRouter } from "#be/apis/v0/trpc/trpc.router";
import { CatsRouter } from "#be/apis/v1/cats/cats.router";
import { CatsService } from "#be/apis/v1/cats/cats.service";
import { UsersService } from "#be/apis/v1/users/users.service";
import { UsersRouter } from "#be/apis/v1/users/users.router";

@Module({
  controllers: [TrpcController],
  providers: [
    PrismaService,
    TrpcService,
    TrpcRouter,
    CatsService,
    CatsRouter,
    UsersService,
    UsersRouter,
  ],
})
export class TrpcModule {}
