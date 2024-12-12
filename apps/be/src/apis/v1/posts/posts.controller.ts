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

import { PostsService } from "#be/apis/v1/posts/posts.service";
import { CreatePostDto } from "#be/apis/v1/posts/dtos/create-post.dto";
import { UpdatePostDto } from "#be/apis/v1/posts/dtos/update-post.dto";
import { IsLoggedIn } from "#be/guards";
import { GetManyRandomPostDto } from "#be/apis/v1/posts/dtos/get-many-random-post.dto";
import { FindKeywordPostDto } from "#be/apis/v1/posts/dtos/find-keyword-post.dto";
import { GetAllCategoryPostDto } from "#be/apis/v1/posts/dtos/get-all-category-post.dto";
import { FindByPostIdDto } from "#be/apis/v1/posts/dtos/find-by-id.dto";
import { CheckUniqueTitleDto } from "#be/apis/v1/posts/dtos/check-unique-title.dto";
import { GetOnePostByTitleDto } from "#be/apis/v1/posts/dtos/get-one-by-post-title.dto";

@Controller("apis/v1/posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(IsLoggedIn)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
    return {
      toast: {
        title: "게시글 작성 완료",
        description: `게시글을 작성했습니다.\n메인 페이지로 이동합니다!`,
      },
      payload: await this.postsService.create(req.user!.id, createPostDto),
    };
  }

  @Get()
  async getAll() {
    return {
      payload: await this.postsService.getAll(),
    };
  }

  @Get("/random")
  async getManyRandom(@Query() getManyRandomPostDto: GetManyRandomPostDto) {
    return {
      payload: await this.postsService.getManyRandom(getManyRandomPostDto),
    };
  }

  @Get(":postId")
  async getOne(@Param() findByIdDto: FindByPostIdDto) {
    return {
      payload: await this.postsService.getOne(findByIdDto),
    };
  }

  @Get("/title/:title")
  async getOneByTitle(@Param() findByTitleDto: GetOnePostByTitleDto) {
    return {
      payload: await this.postsService.getOneByTitle(findByTitleDto),
    };
  }

  @Get("/search/:keyword")
  async getManyKeyword(@Param() findSearchPostDto: FindKeywordPostDto) {
    return {
      payload: await this.postsService.getManyKeyword(findSearchPostDto),
    };
  }

  @Get("/category/:category")
  async getAllCategory(@Param() getAllCategoryPostDto: GetAllCategoryPostDto) {
    return {
      payload: await this.postsService.getAllCategory(getAllCategoryPostDto),
    };
  }

  @UseGuards(IsLoggedIn)
  @Patch(":postId")
  async update(
    @Param() findByIdDto: FindByPostIdDto,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return {
      toast: {
        title: "게시글 수정 완료",
        description: `게시글을 수정했습니다.\n메인 페이지로 이동합니다!`,
      },
      payload: await this.postsService.update(findByIdDto, updatePostDto),
    };
  }

  @UseGuards(IsLoggedIn)
  @Delete(":postId")
  @HttpCode(HttpStatus.OK)
  async delete(@Param() findByIdDto: FindByPostIdDto) {
    return {
      toast: {
        title: "게시글 삭제 완료",
        description: `게시글을 삭제했습니다.\n메인 페이지로 이동합니다!`,
      },
      payload: await this.postsService.delete(findByIdDto),
    };
  }

  @Post("/check-unique-title")
  @HttpCode(HttpStatus.OK)
  async checkUniqueTitle(@Body() checkUniqueTitleDto: CheckUniqueTitleDto) {
    return {
      payload: await this.postsService.checkUniqueTitle(checkUniqueTitleDto),
    };
  }
}
