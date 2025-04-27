import { Module } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { StoriesCommentsReactionsController } from "#be/apis/v1/stories/comments/reactions/reactions.controller";
import { StoriesCommentsReactionsService } from "#be/apis/v1/stories/comments/reactions/reactions.service";
import { StoriesService } from "#be/apis/v1/stories/stories.service";
import { StoriesCommentsService } from "#be/apis/v1/stories/comments/comments.service";

@Module({
  controllers: [StoriesCommentsReactionsController],
  providers: [
    StoriesCommentsReactionsService,
    PrismaService,
    StoriesService,
    StoriesCommentsService,
  ],
})
export class StoriesCommentsReactionsModule {}
