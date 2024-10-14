import { Module } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { TrpcController } from "#be/apis/v0/trpc/trpc.controller";
import { TrpcService } from "#be/apis/v0/trpc/trpc.service";
import { TrpcRouter } from "#be/apis/v0/trpc/trpc.router";
import { CatsRouter } from "#be/apis/v1/cats/cats.router";
import { CatsService } from "#be/apis/v1/cats/cats.service";
import { UsersService } from "#be/apis/v1/users/users.service";
import { UsersRouter } from "#be/apis/v1/users/users.router";
import { PostsService } from "#be/apis/v1/posts/posts.service";
import { PostsRouter } from "#be/apis/v1/posts/posts.router";
import { ImagesService } from "#be/apis/v1/images/images.service";
import { ImagesRouter } from "#be/apis/v1/images/images.router";

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
    PostsService,
    PostsRouter,
    ImagesService,
    ImagesRouter,
  ],
})
export class TrpcModule {}
