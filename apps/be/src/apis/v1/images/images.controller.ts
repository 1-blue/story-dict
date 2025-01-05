import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from "@nestjs/common";

import { ImagesService } from "#be/apis/v1/images/images.service";
import { CreatePresignedURLDto } from "#be/apis/v1/images/dto/create-presinged-url.dto";
import { MoveImageDto } from "#be/apis/v1/images/dto/move-image.dto";

@Controller("apis/v1/images")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post("/presigned-url")
  @HttpCode(HttpStatus.CREATED)
  async createPresignedURL(
    @Body() createPresignedURLDto: CreatePresignedURLDto,
  ) {
    return {
      payload: await this.imagesService.createPresignedURL(
        createPresignedURLDto,
      ),
    };
  }

  @Patch("/move")
  @HttpCode(HttpStatus.OK)
  async moveImage(@Body() body: MoveImageDto) {
    return this.imagesService.move(body);
  }
}
