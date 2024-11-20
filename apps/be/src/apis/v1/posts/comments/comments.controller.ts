import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
} from "@nestjs/common";
import type { Request } from "express";

import { PostsCommentsService } from "#be/apis/v1/posts/comments/comments.service";
import { CreateCommentDto } from "#be/apis/v1/posts/comments/dtos/create-comment.dto";
import { UpdateCommentDto } from "#be/apis/v1/posts/comments/dtos/update-comment.dto";
import { IsLoggedIn } from "#be/guards";
import {
  FindByPostIdAndCommentIdDto,
  FindByPostIdDto,
} from "#be/apis/v1/posts/comments/dtos/find-by-id.dto";

@Controller("apis/v1/posts/:postId/comments")
export class PostsCommentsController {
  constructor(private readonly postsCommentsService: PostsCommentsService) {}

  @UseGuards(IsLoggedIn)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Req() req: Request,
    @Param() findByIdDto: FindByPostIdDto,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.postsCommentsService.create(
      req.user!.id,
      findByIdDto,
      createCommentDto,
    );
  }

  @Get()
  findMany(@Param() findByIdDto: FindByPostIdDto) {
    return this.postsCommentsService.findMany(findByIdDto);
  }

  @UseGuards(IsLoggedIn)
  @Patch(":commentId")
  update(
    @Param() findByIdDto: FindByPostIdAndCommentIdDto,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.postsCommentsService.update(findByIdDto, updateCommentDto);
  }

  @UseGuards(IsLoggedIn)
  @Delete(":commentId")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() findByIdDto: FindByPostIdAndCommentIdDto) {
    return this.postsCommentsService.delete(findByIdDto);
  }
}
