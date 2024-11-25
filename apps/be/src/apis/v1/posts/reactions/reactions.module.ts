import { Module } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { PostsReactionsController } from "#be/apis/v1/posts/reactions/reactions.controller";
import { PostsReactionsService } from "#be/apis/v1/posts/reactions/reactions.service";

@Module({
  controllers: [PostsReactionsController],
  providers: [PostsReactionsService, PrismaService],
})
export class PostsReactionsModule {}