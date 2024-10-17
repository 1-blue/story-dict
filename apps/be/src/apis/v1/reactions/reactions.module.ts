import { Module } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { ReactionsController } from "#be/apis/v1/reactions/reactions.controller";
import { ReactionsService } from "#be/apis/v1/reactions/reactions.service";

@Module({
  controllers: [ReactionsController],
  providers: [ReactionsService, PrismaService],
})
export class ReactionsModule {}
