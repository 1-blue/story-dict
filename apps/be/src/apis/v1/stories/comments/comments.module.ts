import { Module } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { StoriesCommentsService } from "#be/apis/v1/stories/comments/comments.service";
import { StoriesCommentsController } from "#be/apis/v1/stories/comments/comments.controller";
import { StoriesService } from "#be/apis/v1/stories/stories.service";

@Module({
  controllers: [StoriesCommentsController],
  providers: [StoriesCommentsService, PrismaService, StoriesService],
})
export class StoriesCommentsModule {}
