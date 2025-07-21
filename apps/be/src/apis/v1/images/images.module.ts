import { Global, Module } from "@nestjs/common";

import { ImagesService } from "#be/apis/v1/images/images.service";
import { ImagesController } from "#be/apis/v1/images/images.controller";

@Global()
@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
