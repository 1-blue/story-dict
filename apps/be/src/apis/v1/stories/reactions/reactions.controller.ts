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
import { StoriesReactionsService } from "#be/apis/v1/stories/reactions/reactions.service";
import { CreateReactionDto } from "#be/apis/v1/stories/reactions/dtos/create-reaction.dto";
import { UpdateReactionDto } from "#be/apis/v1/stories/reactions/dtos/update-reaction.dto";
import {
  FindByStoryIdAndReactionIdDto,
  FindByStoryIdDto,
} from "#be/apis/v1/stories/reactions/dtos/find-by-id.dto";
import { reactionTypeToEmojiMap } from "@sd/utils";

@Controller("apis/v1/stories/:storyId/reactions")
export class StoriesReactionsController {
  constructor(
    private readonly storiesReactionsService: StoriesReactionsService,
  ) {}

  @UseGuards(IsLoggedIn)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Req() req: Request,
    @Param() findByIdDto: FindByStoryIdDto,
    @Body() createReactionDto: CreateReactionDto,
  ) {
    return {
      toast: {
        title: "이야기 리액션 생성",
        description: `이야기의 "${reactionTypeToEmojiMap[createReactionDto.type]}" 리액션이 성공적으로 생성되었습니다.`,
      },
      payload: await this.storiesReactionsService.create(
        req.user!.id,
        findByIdDto,
        createReactionDto,
      ),
    };
  }

  @UseGuards(IsLoggedIn)
  @Patch(":reactionId")
  async update(
    @Param() findByIdDto: FindByStoryIdAndReactionIdDto,
    @Body() updateReactionDto: UpdateReactionDto,
  ) {
    return {
      toast: {
        title: "이야기 리액션 수정",
        description: `이야기의 리액션을 "${reactionTypeToEmojiMap[updateReactionDto.type]}"로 수정했습니다.`,
      },
      payload: await this.storiesReactionsService.update(
        findByIdDto,
        updateReactionDto,
      ),
    };
  }

  @UseGuards(IsLoggedIn)
  @Delete(":reactionId")
  async delete(@Param() findByIdDto: FindByStoryIdAndReactionIdDto) {
    return {
      toast: {
        title: "이야기 리액션 제거",
        description: "이야기의 리액션을 제거했습니다.",
      },
      payload: await this.storiesReactionsService.delete(findByIdDto),
    };
  }
}
