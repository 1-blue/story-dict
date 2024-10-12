import { Module } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { PostsController } from "#be/apis/v1/posts/posts.controller";
import { PostsService } from "#be/apis/v1/posts/posts.service";

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
})
export class PostsModule {}
