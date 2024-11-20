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

@Controller("apis/v1/posts/:postId/reactions")
export class PostsReactionsController {
  constructor(private readonly postsReactionsService: PostsReactionsService) {}

  @UseGuards(IsLoggedIn)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Req() req: Request,
    @Param() findByIdDto: FindByPostIdDto,
    @Body() createReactionDto: CreateReactionDto,
  ) {
    return this.postsReactionsService.create(
      req.user!.id,
      findByIdDto,
      createReactionDto,
    );
  }

  @UseGuards(IsLoggedIn)
  @Patch(":reactionId")
  update(
    @Param() findByIdDto: FindByPostIdAndReactionIdDto,
    @Body() updateReactionDto: UpdateReactionDto,
  ) {
    return this.postsReactionsService.update(findByIdDto, updateReactionDto);
  }

  @UseGuards(IsLoggedIn)
  @Delete(":reactionId")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() findByIdDto: FindByPostIdAndReactionIdDto) {
    return this.postsReactionsService.delete(findByIdDto);
  }
}
