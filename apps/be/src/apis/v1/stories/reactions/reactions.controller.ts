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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from "@nestjs/swagger";

import { reactionTypeToEmojiMap } from "@sd/utils";
import { IsLoggedIn } from "#be/guards";
import { StoriesReactionsService } from "#be/apis/v1/stories/reactions/reactions.service";
import {
  CreateStoryReactionBodyDTO,
  CreateStoryReactionParamDTO,
  CreateStoryReactionResponseDTO,
  UpdateStoryReactionBodyDTO,
  UpdateStoryReactionParamDTO,
  UpdateStoryReactionResponseDTO,
  DeleteStoryReactionParamDTO,
  DeleteStoryReactionResponseDTO,
} from "#be/apis/v1/stories/reactions/dtos";

@Controller("apis/v1/stories/:storyId/reactions")
export class StoriesReactionsController {
  constructor(
    private readonly storiesReactionsService: StoriesReactionsService,
  ) {}

  @UseGuards(IsLoggedIn)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "이야기 리액션 생성" })
  @ApiParam({
    name: "storyId",
    description: "이야기 식별자",
    type: CreateStoryReactionParamDTO,
  })
  @ApiBody({
    description: "이야기 리액션 생성 요청 본문",
    type: CreateStoryReactionBodyDTO,
  })
  @ApiCreatedResponse({
    description: "이야기 리액션 생성 성공",
    type: CreateStoryReactionResponseDTO,
  })
  async create(
    @Req() req: Request,
    @Param() paramDTO: CreateStoryReactionParamDTO,
    @Body() bodyDTO: CreateStoryReactionBodyDTO,
  ) {
    return {
      toast: {
        title: "이야기 리액션 생성",
        description: `이야기의 "${reactionTypeToEmojiMap[bodyDTO.type]}" 리액션이 성공적으로 생성되었습니다.`,
      },
      payload: await this.storiesReactionsService.create(
        req.user!.id,
        paramDTO,
        bodyDTO,
      ),
    };
  }

  @UseGuards(IsLoggedIn)
  @Patch(":reactionId")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "이야기 리액션 수정" })
  @ApiParam({
    name: "reactionId",
    description: "리액션 식별자",
    type: UpdateStoryReactionParamDTO,
  })
  @ApiBody({
    description: "이야기 리액션 수정 요청 본문",
    type: UpdateStoryReactionBodyDTO,
  })
  @ApiResponse({
    description: "이야기 리액션 수정 성공",
    type: UpdateStoryReactionResponseDTO,
  })
  async update(
    @Param() paramDTO: UpdateStoryReactionParamDTO,
    @Body() bodyDTO: UpdateStoryReactionBodyDTO,
  ) {
    return {
      toast: {
        title: "이야기 리액션 수정",
        description: `이야기의 리액션을 "${reactionTypeToEmojiMap[bodyDTO.type]}"로 수정했습니다.`,
      },
      payload: await this.storiesReactionsService.update(paramDTO, bodyDTO),
    };
  }

  @UseGuards(IsLoggedIn)
  @Delete(":reactionId")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "이야기 리액션 제거" })
  @ApiParam({
    name: "reactionId",
    description: "리액션 식별자",
    type: DeleteStoryReactionParamDTO,
  })
  @ApiResponse({
    description: "이야기 리액션 제거 성공",
    type: DeleteStoryReactionResponseDTO,
  })
  async delete(@Param() paramDTO: DeleteStoryReactionParamDTO) {
    return {
      toast: {
        title: "이야기 리액션 제거",
        description: "이야기의 리액션을 제거했습니다.",
      },
      payload: await this.storiesReactionsService.delete(paramDTO),
    };
  }
}
