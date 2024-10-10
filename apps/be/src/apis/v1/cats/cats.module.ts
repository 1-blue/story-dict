import { Module } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { CatsController } from "#be/apis/v1/cats/cats.controller";
import { CatsService } from "#be/apis/v1/cats/cats.service";

@Module({
  controllers: [CatsController],
  providers: [CatsService, PrismaService],
})
export class CatsModule {}
