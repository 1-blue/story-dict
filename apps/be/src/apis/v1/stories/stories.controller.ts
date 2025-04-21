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

import { StoriesService } from "#be/apis/v1/stories/stories.service";
import { CreateStoryDto } from "#be/apis/v1/stories/dtos/create-story.dto";
import { UpdateStoryDto } from "#be/apis/v1/stories/dtos/update-story.dto";
import { IsLoggedIn } from "#be/guards";
import { GetManyRandomStoryDto } from "#be/apis/v1/stories/dtos/get-many-random-story.dto";
import { FindKeywordStoryDto } from "#be/apis/v1/stories/dtos/find-keyword-story.dto";
import { GetAllCategoryStoryDto } from "#be/apis/v1/stories/dtos/get-all-category-story.dto";
import { FindByStoryIdDto } from "#be/apis/v1/stories/dtos/find-by-id.dto";
import { CheckUniqueTitleDto } from "#be/apis/v1/stories/dtos/check-unique-title.dto";
import { GetOneStoryByTitleDto } from "#be/apis/v1/stories/dtos/get-one-by-story-title.dto";

@Controller("apis/v1/stories")
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @UseGuards(IsLoggedIn)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req: Request, @Body() createStoryDto: CreateStoryDto) {
    return {
      toast: {
        title: "게시글 작성 완료",
        description: `게시글을 작성했습니다.\n메인 페이지로 이동합니다!`,
      },
      payload: await this.storiesService.create(req.user!.id, createStoryDto),
    };
  }

  @Get()
  async getAll() {
    return {
      payload: await this.storiesService.getAll(),
    };
  }

  @Get("/random")
  async getManyRandom(@Query() getManyRandomStoryDto: GetManyRandomStoryDto) {
    return {
      payload: await this.storiesService.getManyRandom(getManyRandomStoryDto),
    };
  }

  @Get(":storyId")
  async getOne(@Param() findByIdDto: FindByStoryIdDto) {
    return {
      payload: await this.storiesService.getOne(findByIdDto),
    };
  }

  @Get("/title/:title")
  async getOneByTitle(@Param() findByTitleDto: GetOneStoryByTitleDto) {
    return {
      payload: await this.storiesService.getOneByTitle(findByTitleDto),
    };
  }

  @Get("/search/:keyword")
  async getManyKeyword(@Param() findSearchStoryDto: FindKeywordStoryDto) {
    return {
      payload: await this.storiesService.getManyKeyword(findSearchStoryDto),
    };
  }

  @Get("/category/:category")
  async getAllCategory(
    @Param() getAllCategoryStoryDto: GetAllCategoryStoryDto,
  ) {
    return {
      payload: await this.storiesService.getAllCategory(getAllCategoryStoryDto),
    };
  }

  @UseGuards(IsLoggedIn)
  @Patch(":storyId")
  async update(
    @Param() findByIdDto: FindByStoryIdDto,
    @Body() updateStoryDto: UpdateStoryDto,
  ) {
    return {
      toast: {
        title: "게시글 수정 완료",
        description: `게시글을 수정했습니다.\n메인 페이지로 이동합니다!`,
      },
      payload: await this.storiesService.update(findByIdDto, updateStoryDto),
    };
  }

  @UseGuards(IsLoggedIn)
  @Delete(":storyId")
  @HttpCode(HttpStatus.OK)
  async delete(@Param() findByIdDto: FindByStoryIdDto) {
    return {
      toast: {
        title: "게시글 삭제 완료",
        description: `게시글을 삭제했습니다.\n메인 페이지로 이동합니다!`,
      },
      payload: await this.storiesService.delete(findByIdDto),
    };
  }

  @Post("/check-unique-title")
  @HttpCode(HttpStatus.OK)
  async checkUniqueTitle(@Body() checkUniqueTitleDto: CheckUniqueTitleDto) {
    return {
      payload: await this.storiesService.checkUniqueTitle(checkUniqueTitleDto),
    };
  }
}
