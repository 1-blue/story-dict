import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import { ImagesService } from "#be/apis/v1/images/images.service";
import { CreateImageDto } from "#be/apis/v1/images/dto/create-image.dto";
import { MoveImageDto } from "#be/apis/v1/images/dto/move-image.dto";
import { DeleteImageDto } from "#be/apis/v1/images/dto/delete-image.dto";
import { CreatePresignedURLDto } from "#be/apis/v1/images/dto/create-presinged-url.dto";
import { FindByImageIdDto } from "#be/apis/v1/images/dto/find-by-id.dto";

@Controller("apis/v1/images")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  create(@Body() createDto: CreateImageDto) {
    return this.imagesService.create(createDto);
  }

  @Get(":imageId")
  getOne(@Param() fineByIdDto: FindByImageIdDto) {
    return this.imagesService.getOne(fineByIdDto);
  }

  @Patch(":imageId")
  move(@Param() findByIdDto: FindByImageIdDto, @Body() moveDto: MoveImageDto) {
    return this.imagesService.move(findByIdDto, moveDto);
  }

  @Delete(":imageId")
  delete(
    @Param() findByIdDto: FindByImageIdDto,
    @Body() deleteS3Dto: DeleteImageDto,
  ) {
    return this.imagesService.delete(findByIdDto, deleteS3Dto);
  }

  @Post("/presigned-url")
  createPresignedURL(@Body() createPresignedURLDto: CreatePresignedURLDto) {
    return this.imagesService.createPresignedURL(createPresignedURLDto);
  }
}
