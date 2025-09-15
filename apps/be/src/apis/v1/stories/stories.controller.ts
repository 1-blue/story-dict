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
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import type { Request } from "express";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { StoriesService } from "#be/apis/v1/stories/stories.service";

import { IsLoggedIn } from "#be/guards";
import {
  CreateStoryBodyDTO,
  CreateStoryResponseDTO,
  UpdateStoryBodyDTO,
  UpdateStoryParamDTO,
  UpdateStoryResponseDTO,
  GetManyByKeywordParamDTO,
  GetManyByKeywordResponseDTO,
  GetAllStoryByCategoryParamDTO,
  GetAllStoryByCategoryResponseDTO,
  CheckUniqueTitleBodyDTO,
  CheckUniqueTitleResponseDTO,
  GetAllStoriesResponseDTO,
  GetOneStoryByTitleParamDTO,
  GetOneStoryByTitleResponseDTO,
  GetOneStoryByIdParamDTO,
  GetOneStoryByIdResponseDTO,
  DeleteStoryParamDTO,
  DeleteStoryResponseDTO,
  GetManyShortsResponseDTO,
  GetManyShortsQueryDTO,
} from "#be/apis/v1/stories/dtos";

@Controller("apis/v1/stories")
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @UseGuards(IsLoggedIn)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "이야기 생성" })
  @ApiResponse({
    status: 201,
    description: "이야기 생성 성공",
    type: CreateStoryResponseDTO,
  })
  async create(@Req() req: Request, @Body() bodyDTO: CreateStoryBodyDTO) {
    return {
      toast: {
        title: "이야기 작성 완료",
        description: `이야기를 작성했습니다.\n메인 페이지로 이동합니다!`,
      },
      payload: await this.storiesService.create(req.user!.id, bodyDTO),
    };
  }

  @Get()
  @ApiOperation({ summary: "모든 이야기 조회" })
  @ApiResponse({
    status: 200,
    description: "모든 이야기 조회 성공",
    type: GetAllStoriesResponseDTO,
  })
  async getAll() {
    return {
      payload: await this.storiesService.getAll(),
    };
  }

  @Get("/title/:title")
  @ApiOperation({ summary: "제목으로 이야기 조회" })
  @ApiResponse({
    status: 200,
    description: "제목으로 이야기 조회 성공",
    type: GetOneStoryByTitleResponseDTO,
  })
  async getOneByTitle(@Param() paramDTO: GetOneStoryByTitleParamDTO) {
    return {
      payload: await this.storiesService.getOneByTitle(paramDTO),
    };
  }

  @Get("/shorts")
  @ApiOperation({ summary: "이야기 쇼츠들 조회" })
  @ApiResponse({
    status: 200,
    description: "이야기 쇼츠들 조회 성공",
    type: GetManyShortsResponseDTO,
  })
  async getManyShorts(@Query() queryDTO: GetManyShortsQueryDTO) {
    return {
      payload: await this.storiesService.getManyShorts(queryDTO),
    };
  }

  @Get(":storyId")
  @ApiOperation({ summary: "식별자로 이야기 조회" })
  @ApiResponse({
    status: 200,
    description: "식별자로 이야기 조회 성공",
    type: GetOneStoryByIdResponseDTO,
  })
  async getOne(@Param() paramDTO: GetOneStoryByIdParamDTO) {
    return {
      payload: await this.storiesService.getOne(paramDTO),
    };
  }

  @Get("/search/:keyword")
  @ApiOperation({ summary: "키워드 기반 이야기 조회" })
  @ApiResponse({
    status: 200,
    description: "키워드 기반 이야기 조회 성공",
    type: GetManyByKeywordResponseDTO,
  })
  async getManyKeyword(@Param() paramDTO: GetManyByKeywordParamDTO) {
    return {
      payload: await this.storiesService.getManyKeyword(paramDTO),
    };
  }

  @Get("/category/:category")
  @ApiOperation({ summary: "카테고리 기반 이야기 조회" })
  @ApiResponse({
    status: 200,
    description: "카테고리 기반 이야기 조회 성공",
    type: GetAllStoryByCategoryResponseDTO,
  })
  async getAllCategory(@Param() paramDTO: GetAllStoryByCategoryParamDTO) {
    return {
      payload: await this.storiesService.getAllCategory(paramDTO),
    };
  }

  @UseGuards(IsLoggedIn)
  @Patch(":storyId")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "이야기 수정" })
  @ApiResponse({
    status: 200,
    description: "이야기 수정 성공",
    type: UpdateStoryResponseDTO,
  })
  async update(
    @Param() paramDTO: UpdateStoryParamDTO,
    @Body() bodyDTO: UpdateStoryBodyDTO,
  ) {
    return {
      toast: {
        title: "이야기 수정 완료",
        description: `이야기를 수정했습니다.\n메인 페이지로 이동합니다!`,
      },
      payload: await this.storiesService.update(paramDTO, bodyDTO),
    };
  }

  @UseGuards(IsLoggedIn)
  @Delete(":storyId")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "이야기 삭제" })
  @ApiResponse({
    status: 200,
    description: "이야기 삭제 성공",
    type: DeleteStoryResponseDTO,
  })
  async delete(@Param() paramDTO: DeleteStoryParamDTO) {
    return {
      toast: {
        title: "이야기 삭제 완료",
        description: `이야기를 삭제했습니다.\n메인 페이지로 이동합니다!`,
      },
      payload: await this.storiesService.delete(paramDTO),
    };
  }

  @Post("/check-unique-title")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "제목 중복 여부 확인" })
  @ApiResponse({
    status: 200,
    description: "제목 중복 여부 확인 성공",
    type: CheckUniqueTitleResponseDTO,
  })
  async checkUniqueTitle(@Body() bodyDTO: CheckUniqueTitleBodyDTO) {
    return {
      payload: await this.storiesService.checkUniqueTitle(bodyDTO),
    };
  }
}
