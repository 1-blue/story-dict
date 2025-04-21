import { Module } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { StoriesReactionsController } from "#be/apis/v1/stories/reactions/reactions.controller";
import { StoriesReactionsService } from "#be/apis/v1/stories/reactions/reactions.service";
import { StoriesService } from "#be/apis/v1/stories/stories.service";

@Module({
  controllers: [StoriesReactionsController],
  providers: [StoriesReactionsService, PrismaService, StoriesService],
})
export class StoriesReactionsModule {}
