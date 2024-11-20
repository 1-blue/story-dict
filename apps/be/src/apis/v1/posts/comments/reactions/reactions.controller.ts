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

@Controller("apis/v1/posts/:postId/comments/:commentId/reactions")
export class PostsCommentsReactionsController {
  constructor(
    private readonly postsCommentsReactionsService: PostsCommentsReactionsService,
  ) {}

  @UseGuards(IsLoggedIn)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Req() req: Request,
    @Param() findByIdDto: FindByPostIdAndCommentIdDto,
    @Body() createReactionDto: CreateReactionDto,
  ) {
    return this.postsCommentsReactionsService.create(
      req.user!.id,
      findByIdDto,
      createReactionDto,
    );
  }

  @UseGuards(IsLoggedIn)
  @Patch(":reactionId")
  update(
    @Param() findByIdDto: FindByPostIdAndCommentIdAndReactionIdDto,
    @Body() updateReactionDto: UpdateReactionDto,
  ) {
    return this.postsCommentsReactionsService.update(
      findByIdDto,
      updateReactionDto,
    );
  }

  @UseGuards(IsLoggedIn)
  @Delete(":reactionId")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() findByIdDto: FindByPostIdAndCommentIdAndReactionIdDto) {
    return this.postsCommentsReactionsService.delete(findByIdDto);
  }
}
