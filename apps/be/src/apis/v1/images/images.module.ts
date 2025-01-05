import { Global, Module } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { ImagesService } from "#be/apis/v1/images/images.service";
import { ImagesController } from "#be/apis/v1/images/images.controller";

@Global()
@Module({
  controllers: [ImagesController],
  providers: [ImagesService, PrismaService],
  exports: [ImagesService],
})
export class ImagesModule {}
