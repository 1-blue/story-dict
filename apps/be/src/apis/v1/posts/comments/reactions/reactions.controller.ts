import type { Request } from "express";
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";

import { IsLoggedIn } from "#be/guards";
import { PostsCommentsReactionsService } from "#be/apis/v1/posts/comments/reactions/reactions.service";
import { CreateReactionDto } from "#be/apis/v1/posts/comments/reactions/dtos/create-reaction.dto";
import { UpdateReactionDto } from "#be/apis/v1/posts/comments/reactions/dtos/update-reaction.dto";
import {
  FindByPostIdAndCommentIdAndReactionIdDto,
  FindByPostIdAndCommentIdDto,
} from "#be/apis/v1/posts/comments/reactions/dtos/find-by-id.dto";
import { reactionTypeToEmojiMap } from "@sd/utils";

@Controller("apis/v1/posts/:postId/comments/:commentId/reactions")
export class PostsCommentsReactionsController {
  constructor(
    private readonly postsCommentsReactionsService: PostsCommentsReactionsService,
  ) {}

  @UseGuards(IsLoggedIn)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Req() req: Request,
    @Param() findByIdDto: FindByPostIdAndCommentIdDto,
    @Body() createReactionDto: CreateReactionDto,
  ) {
    return {
      toast: {
        title: "댓글 리액션 생성",
        description: `댓글의 "${reactionTypeToEmojiMap[createReactionDto.type]}" 리액션이 성공적으로 생성되었습니다.`,
      },
      payload: await this.postsCommentsReactionsService.create(
        req.user!.id,
        findByIdDto,
        createReactionDto,
      ),
    };
  }

  @UseGuards(IsLoggedIn)
  @Patch(":reactionId")
  async update(
    @Param() findByIdDto: FindByPostIdAndCommentIdAndReactionIdDto,
    @Body() updateReactionDto: UpdateReactionDto,
  ) {
    return {
      toast: {
        title: "댓글 리액션 교체",
        description: `댓글의 리액션을 "${reactionTypeToEmojiMap[updateReactionDto.type]}"로 교체했습니다.`,
      },
      payload: await this.postsCommentsReactionsService.update(
        findByIdDto,
        updateReactionDto,
      ),
    };
  }

  @UseGuards(IsLoggedIn)
  @Delete(":reactionId")
  async delete(@Param() findByIdDto: FindByPostIdAndCommentIdAndReactionIdDto) {
    return {
      toast: {
        title: "댓글 리액션 제거",
        description: `댓글의 리액션을 제거했습니다.`,
      },
      payload: await this.postsCommentsReactionsService.delete(findByIdDto),
    };
  }
}
