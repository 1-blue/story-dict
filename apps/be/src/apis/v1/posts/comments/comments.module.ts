import { Module } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { PostsCommentsService } from "#be/apis/v1/posts/comments/comments.service";
import { PostsCommentsController } from "#be/apis/v1/posts/comments/comments.controller";

@Module({
  controllers: [PostsCommentsController],
  providers: [PostsCommentsService, PrismaService],
})
export class PostsCommentsModule {}
