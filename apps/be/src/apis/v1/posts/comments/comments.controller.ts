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
  async create(
    @Req() req: Request,
    @Param() findByIdDto: FindByPostIdDto,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return {
      toast: {
        title: "댓글 작성 완료",
        description: `댓글을 작성했습니다.`,
      },
      payload: await this.postsCommentsService.create(
        req.user!.id,
        findByIdDto,
        createCommentDto,
      ),
    };
  }

  @Get()
  async findMany(@Param() findByIdDto: FindByPostIdDto) {
    return {
      payload: await this.postsCommentsService.findMany(findByIdDto),
    };
  }

  @UseGuards(IsLoggedIn)
  @Patch(":commentId")
  async update(
    @Param() findByIdDto: FindByPostIdAndCommentIdDto,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return {
      toast: {
        title: "댓글 수정 완료",
        description: `댓글을 수정했습니다.`,
      },
      payload: await this.postsCommentsService.update(
        findByIdDto,
        updateCommentDto,
      ),
    };
  }

  @UseGuards(IsLoggedIn)
  @Delete(":commentId")
  async delete(@Param() findByIdDto: FindByPostIdAndCommentIdDto) {
    return {
      toast: {
        title: "댓글 삭제 완료",
        description: `댓글을 삭제했습니다.`,
      },
      payload: await this.postsCommentsService.delete(findByIdDto),
    };
  }
}
