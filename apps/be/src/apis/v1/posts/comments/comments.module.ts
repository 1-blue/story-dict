import { Module } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { PostsCommentsService } from "#be/apis/v1/posts/comments/comments.service";
import { PostsCommentsController } from "#be/apis/v1/posts/comments/comments.controller";
import { PostsService } from "#be/apis/v1/posts/posts.service";

@Module({
  controllers: [PostsCommentsController],
  providers: [PostsCommentsService, PrismaService, PostsService],
})
export class PostsCommentsModule {}
