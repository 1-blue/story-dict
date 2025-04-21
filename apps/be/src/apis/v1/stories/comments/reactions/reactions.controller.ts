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
import { StoriesCommentsReactionsService } from "#be/apis/v1/stories/comments/reactions/reactions.service";
import { CreateReactionDto } from "#be/apis/v1/stories/comments/reactions/dtos/create-reaction.dto";
import { UpdateReactionDto } from "#be/apis/v1/stories/comments/reactions/dtos/update-reaction.dto";
import {
  FindByStoryIdAndCommentIdAndReactionIdDto,
  FindByStoryIdAndCommentIdDto,
} from "#be/apis/v1/stories/comments/reactions/dtos/find-by-id.dto";
import { reactionTypeToEmojiMap } from "@sd/utils";

@Controller("apis/v1/stories/:storyId/comments/:commentId/reactions")
export class StoriesCommentsReactionsController {
  constructor(
    private readonly storiesCommentsReactionsService: StoriesCommentsReactionsService,
  ) {}

  @UseGuards(IsLoggedIn)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Req() req: Request,
    @Param() findByIdDto: FindByStoryIdAndCommentIdDto,
    @Body() createReactionDto: CreateReactionDto,
  ) {
    return {
      toast: {
        title: "댓글 리액션 생성",
        description: `댓글의 "${reactionTypeToEmojiMap[createReactionDto.type]}" 리액션이 성공적으로 생성되었습니다.`,
      },
      payload: await this.storiesCommentsReactionsService.create(
        req.user!.id,
        findByIdDto,
        createReactionDto,
      ),
    };
  }

  @UseGuards(IsLoggedIn)
  @Patch(":reactionId")
  async update(
    @Param() findByIdDto: FindByStoryIdAndCommentIdAndReactionIdDto,
    @Body() updateReactionDto: UpdateReactionDto,
  ) {
    return {
      toast: {
        title: "댓글 리액션 교체",
        description: `댓글의 리액션을 "${reactionTypeToEmojiMap[updateReactionDto.type]}"로 교체했습니다.`,
      },
      payload: await this.storiesCommentsReactionsService.update(
        findByIdDto,
        updateReactionDto,
      ),
    };
  }

  @UseGuards(IsLoggedIn)
  @Delete(":reactionId")
  async delete(
    @Param() findByIdDto: FindByStoryIdAndCommentIdAndReactionIdDto,
  ) {
    return {
      toast: {
        title: "댓글 리액션 제거",
        description: `댓글의 리액션을 제거했습니다.`,
      },
      payload: await this.storiesCommentsReactionsService.delete(findByIdDto),
    };
  }
}
