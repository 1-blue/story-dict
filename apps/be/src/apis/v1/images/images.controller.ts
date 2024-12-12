import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateImageDto) {
    return {
      toast: {
        title: "이미지 등록 완료",
        description: `이미지를 등록했습니다.`,
      },
      payload: await this.imagesService.create(createDto),
    };
  }

  @Get(":imageId")
  async getOne(@Param() fineByIdDto: FindByImageIdDto) {
    return {
      payload: await this.imagesService.getOne(fineByIdDto),
    };
  }

  @Patch(":imageId")
  async move(
    @Param() findByIdDto: FindByImageIdDto,
    @Body() moveDto: MoveImageDto,
  ) {
    return {
      payload: await this.imagesService.move(findByIdDto, moveDto),
    };
  }

  @Delete(":imageId")
  async delete(
    @Param() findByIdDto: FindByImageIdDto,
    @Body() deleteS3Dto: DeleteImageDto,
  ) {
    return {
      payload: await this.imagesService.delete(findByIdDto, deleteS3Dto),
    };
  }

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
}
