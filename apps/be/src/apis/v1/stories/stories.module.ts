import { Module } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { StoriesController } from "#be/apis/v1/stories/stories.controller";
import { StoriesService } from "#be/apis/v1/stories/stories.service";

@Module({
  controllers: [StoriesController],
  providers: [StoriesService, PrismaService],
})
export class StoriesModule {}
