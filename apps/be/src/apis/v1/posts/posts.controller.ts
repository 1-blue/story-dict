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
  UseGuards,
} from "@nestjs/common";

import { FindByIdDto } from "#be/dtos/find-by-id.dto";
import { PostsService } from "#be/apis/v1/posts/posts.service";
import { CreatePostDto } from "#be/apis/v1/posts/dtos/create-post.dto";
import { UpdatePostDto } from "#be/apis/v1/posts/dtos/update-post.dto";
import { IsLoggedIn } from "#be/guards";
import { FindRandomPostDto } from "#be/apis/v1/posts/dtos/find-random-post.dto";
import { FindKeywordPostDto } from "#be/apis/v1/posts/dtos/find-keyword-post.dto";

@Controller("apis/v1/posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(IsLoggedIn)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findMany() {
    return this.postsService.findMany();
  }

  @Get(":id")
  findOne(@Param() findByIdDto: FindByIdDto) {
    return this.postsService.findOne(findByIdDto);
  }

  @Get("/random")
  findRandom(@Param() findRandomPostDto: FindRandomPostDto) {
    return this.postsService.findRandom(findRandomPostDto);
  }

  @Get("/search/:keyword")
  findKeyword(@Param() findSearchPostDto: FindKeywordPostDto) {
    return this.postsService.findKeyword(findSearchPostDto);
  }

  @UseGuards(IsLoggedIn)
  @Patch(":id")
  update(
    @Param() findByIdDto: FindByIdDto,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(findByIdDto, updatePostDto);
  }

  @UseGuards(IsLoggedIn)
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() findByIdDto: FindByIdDto) {
    return this.postsService.delete(findByIdDto);
  }
}
