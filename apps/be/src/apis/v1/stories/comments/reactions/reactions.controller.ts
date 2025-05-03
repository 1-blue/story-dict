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
import { ApiCreatedResponse, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { reactionTypeToEmojiMap } from "@sd/utils";

import { IsLoggedIn } from "#be/guards";
import { StoriesCommentsReactionsService } from "#be/apis/v1/stories/comments/reactions/reactions.service";
import {
  CreateStoryCommentReactionBodyDTO,
  CreateStoryCommentReactionParamDTO,
  CreateStoryCommentReactionResponseDTO,
  UpdateStoryCommentReactionBodyDTO,
  UpdateStoryCommentReactionParamDTO,
  UpdateStoryCommentReactionResponseDTO,
  DeleteStoryCommentReactionParamDTO,
  DeleteStoryCommentReactionResponseDTO,
} from "#be/apis/v1/stories/comments/reactions/dtos";

@Controller("apis/v1/stories/:storyId/comments/:commentId/reactions")
export class StoriesCommentsReactionsController {
  constructor(
    private readonly storiesCommentsReactionsService: StoriesCommentsReactionsService,
  ) {}

  @UseGuards(IsLoggedIn)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "댓글 리액션 생성" })
  @ApiCreatedResponse({
    description: "댓글 리액션 생성 성공",
    type: CreateStoryCommentReactionResponseDTO,
  })
  async create(
    @Req() req: Request,
    @Param() paramDTO: CreateStoryCommentReactionParamDTO,
    @Body() bodyDTO: CreateStoryCommentReactionBodyDTO,
  ) {
    return {
      toast: {
        title: "댓글 리액션 생성",
        description: `댓글의 "${reactionTypeToEmojiMap[bodyDTO.type]}" 리액션이 성공적으로 생성되었습니다.`,
      },
      payload: await this.storiesCommentsReactionsService.create(
        req.user!.id,
        paramDTO,
        bodyDTO,
      ),
    };
  }

  @UseGuards(IsLoggedIn)
  @Patch(":reactionId")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "댓글 리액션 교체" })
  @ApiResponse({
    status: 200,
    description: "댓글 리액션 교체 성공",
    type: UpdateStoryCommentReactionResponseDTO,
  })
  async update(
    @Param() paramDTO: UpdateStoryCommentReactionParamDTO,
    @Body() bodyDTO: UpdateStoryCommentReactionBodyDTO,
  ) {
    return {
      toast: {
        title: "댓글 리액션 교체",
        description: `댓글의 리액션을 "${reactionTypeToEmojiMap[bodyDTO.type]}"로 교체했습니다.`,
      },
      payload: await this.storiesCommentsReactionsService.update(
        paramDTO,
        bodyDTO,
      ),
    };
  }

  @UseGuards(IsLoggedIn)
  @Delete(":reactionId")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "댓글 리액션 제거" })
  @ApiResponse({
    status: 200,
    description: "댓글 리액션 제거 성공",
    type: DeleteStoryCommentReactionResponseDTO,
  })
  async delete(@Param() paramDTO: DeleteStoryCommentReactionParamDTO) {
    return {
      toast: {
        title: "댓글 리액션 제거",
        description: `댓글의 리액션을 제거했습니다.`,
      },
      payload: await this.storiesCommentsReactionsService.delete(paramDTO),
    };
  }
}
