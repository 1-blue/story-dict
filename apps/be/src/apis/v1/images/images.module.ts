import { Module } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { ImagesService } from "#be/apis/v1/images/images.service";
import { ImagesController } from "#be/apis/v1/images/images.controller";

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, PrismaService],
})
export class ImagesModule {}
