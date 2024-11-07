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
  create(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(req.user!.id, createPostDto);
  }

  @Get()
  getAll() {
    return this.postsService.getAll();
  }

  @Get("/random")
  getManyRandom(@Query() getManyRandomPostDto: GetManyRandomPostDto) {
    return this.postsService.getManyRandom(getManyRandomPostDto);
  }

  @Get(":postId")
  getOne(@Param() findByIdDto: FindByPostIdDto) {
    return this.postsService.getOne(findByIdDto);
  }

  @Get("/title/:title")
  getOneByTitle(@Param() findByTitleDto: GetOnePostByTitleDto) {
    return this.postsService.getOneByTitle(findByTitleDto);
  }

  @Get("/search/:keyword")
  getManyKeyword(@Param() findSearchPostDto: FindKeywordPostDto) {
    return this.postsService.getManyKeyword(findSearchPostDto);
  }

  @Get("/category/:category")
  getAllCategory(@Param() getAllCategoryPostDto: GetAllCategoryPostDto) {
    return this.postsService.getAllCategory(getAllCategoryPostDto);
  }

  @UseGuards(IsLoggedIn)
  @Patch(":postId")
  update(
    @Param() findByIdDto: FindByPostIdDto,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(findByIdDto, updatePostDto);
  }

  @UseGuards(IsLoggedIn)
  @Delete(":postId")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() findByIdDto: FindByPostIdDto) {
    return this.postsService.delete(findByIdDto);
  }

  @Post("/check-unique-title")
  checkUniqueTitle(@Body() checkUniqueTitleDto: CheckUniqueTitleDto) {
    return this.postsService.checkUniqueTitle(checkUniqueTitleDto);
  }
}
