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

import { StoriesCommentsService } from "#be/apis/v1/stories/comments/comments.service";
import { CreateCommentDto } from "#be/apis/v1/stories/comments/dtos/create-comment.dto";
import { UpdateCommentDto } from "#be/apis/v1/stories/comments/dtos/update-comment.dto";
import { IsLoggedIn } from "#be/guards";
import {
  FindByStoryIdAndCommentIdDto,
  FindByStoryIdDto,
} from "#be/apis/v1/stories/comments/dtos/find-by-id.dto";

@Controller("apis/v1/stories/:storyId/comments")
export class StoriesCommentsController {
  constructor(
    private readonly storiesCommentsService: StoriesCommentsService,
  ) {}

  @UseGuards(IsLoggedIn)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Req() req: Request,
    @Param() findByIdDto: FindByStoryIdDto,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return {
      toast: {
        title: "댓글 작성 완료",
        description: `댓글을 작성했습니다.`,
      },
      payload: await this.storiesCommentsService.create(
        req.user!.id,
        findByIdDto,
        createCommentDto,
      ),
    };
  }

  @Get()
  async findMany(@Param() findByIdDto: FindByStoryIdDto) {
    return {
      payload: await this.storiesCommentsService.findMany(findByIdDto),
    };
  }

  @UseGuards(IsLoggedIn)
  @Patch(":commentId")
  async update(
    @Param() findByIdDto: FindByStoryIdAndCommentIdDto,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return {
      toast: {
        title: "댓글 수정 완료",
        description: `댓글을 수정했습니다.`,
      },
      payload: await this.storiesCommentsService.update(
        findByIdDto,
        updateCommentDto,
      ),
    };
  }

  @UseGuards(IsLoggedIn)
  @Delete(":commentId")
  async delete(@Param() findByIdDto: FindByStoryIdAndCommentIdDto) {
    return {
      toast: {
        title: "댓글 삭제 완료",
        description: `댓글을 삭제했습니다.`,
      },
      payload: await this.storiesCommentsService.delete(findByIdDto),
    };
  }
}
