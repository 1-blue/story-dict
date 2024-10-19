import { Module } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { CommentsService } from "#be/apis/v1/comments/comments.service";
import { CommentsController } from "#be/apis/v1/comments/comments.controller";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService],
})
export class CommentsModule {}
