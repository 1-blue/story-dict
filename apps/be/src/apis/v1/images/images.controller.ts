import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";

import { ImagesService } from "#be/apis/v1/images/images.service";
import {
  CreatePresignedURLBodyDTO,
  CreatePresignedURLResponseDTO,
} from "#be/apis/v1/images/dto/create-presinged-url.dto";
import {
  MoveImageBodyDTO,
  MoveImageResponseDTO,
} from "#be/apis/v1/images/dto/move-image.dto";

@Controller("apis/v1/images")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post("/presigned-url")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "presignedURL 생성" })
  @ApiBody({ type: CreatePresignedURLBodyDTO })
  @ApiResponse({
    status: 200,
    description: "presignedURL 생성 성공",
    type: CreatePresignedURLResponseDTO,
  })
  async createPresignedURL(@Body() bodyDTO: CreatePresignedURLBodyDTO) {
    return {
      payload: await this.imagesService.createPresignedURL(bodyDTO),
    };
  }

  @Patch("/move")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "이미지 이동" })
  @ApiBody({ type: MoveImageBodyDTO })
  @ApiResponse({
    status: 200,
    description: "이미지 이동 성공",
    type: MoveImageResponseDTO,
  })
  async moveImage(@Body() bodyDTO: MoveImageBodyDTO) {
    return {
      payload: await this.imagesService.move(bodyDTO),
    };
  }
}
