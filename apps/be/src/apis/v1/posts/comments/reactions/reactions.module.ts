import { Module } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { PostsCommentsReactionsController } from "#be/apis/v1/posts/comments/reactions/reactions.controller";
import { PostsCommentsReactionsService } from "#be/apis/v1/posts/comments/reactions/reactions.service";

@Module({
  controllers: [PostsCommentsReactionsController],
  providers: [PostsCommentsReactionsService, PrismaService],
})
export class PostsCommentsReactionsModule {}
