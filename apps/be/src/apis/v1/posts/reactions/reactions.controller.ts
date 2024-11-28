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
import { PostsReactionsService } from "#be/apis/v1/posts/reactions/reactions.service";
import { CreateReactionDto } from "#be/apis/v1/posts/reactions/dtos/create-reaction.dto";
import { UpdateReactionDto } from "#be/apis/v1/posts/reactions/dtos/update-reaction.dto";
import {
  FindByPostIdAndReactionIdDto,
  FindByPostIdDto,
} from "#be/apis/v1/posts/reactions/dtos/find-by-id.dto";
import { reactionTypeToEmojiMap } from "@sd/utils";

@Controller("apis/v1/posts/:postId/reactions")
export class PostsReactionsController {
  constructor(private readonly postsReactionsService: PostsReactionsService) {}

  @UseGuards(IsLoggedIn)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Req() req: Request,
    @Param() findByIdDto: FindByPostIdDto,
    @Body() createReactionDto: CreateReactionDto,
  ) {
    return {
      toast: {
        title: "게시글 리액션 생성",
        description: `게시글의 "${reactionTypeToEmojiMap[createReactionDto.type]}" 리액션이 성공적으로 생성되었습니다.`,
      },
      payload: await this.postsReactionsService.create(
        req.user!.id,
        findByIdDto,
        createReactionDto,
      ),
    };
  }

  @UseGuards(IsLoggedIn)
  @Patch(":reactionId")
  async update(
    @Param() findByIdDto: FindByPostIdAndReactionIdDto,
    @Body() updateReactionDto: UpdateReactionDto,
  ) {
    return {
      toast: {
        title: "게시글 리액션 수정",
        description: `게시글의 리액션을 "${reactionTypeToEmojiMap[updateReactionDto.type]}"로 수정했습니다.`,
      },
      payload: await this.postsReactionsService.update(
        findByIdDto,
        updateReactionDto,
      ),
    };
  }

  @UseGuards(IsLoggedIn)
  @Delete(":reactionId")
  async delete(@Param() findByIdDto: FindByPostIdAndReactionIdDto) {
    return {
      toast: {
        title: "게시글 리액션 제거",
        description: "게시글의 리액션을 제거했습니다.",
      },
      payload: await this.postsReactionsService.delete(findByIdDto),
    };
  }
}
