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

import { FindByIdDto } from "#be/dtos/find-by-id.dto";
import { CommentsService } from "#be/apis/v1/comments/comments.service";
import { CreateCommentDto } from "#be/apis/v1/comments/dtos/create-comment.dto";
import { UpdateCommentDto } from "#be/apis/v1/comments/dtos/update-comment.dto";
import { IsLoggedIn } from "#be/guards";
import {
  FindByPostIdAndCommentIdDto,
  FindByPostIdDto,
} from "#be/apis/v1/comments/dtos/find-by-id.dto";

@Controller("apis/v1/posts/:postId/comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(IsLoggedIn)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Req() req: Request, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(req.user!.id, createCommentDto);
  }

  @Get()
  findMany(@Param() findByIdDto: FindByPostIdDto) {
    return this.commentsService.findMany(findByIdDto);
  }

  @UseGuards(IsLoggedIn)
  @Patch(":commentId")
  update(
    @Param() findByIdDto: FindByPostIdAndCommentIdDto,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(findByIdDto, updateCommentDto);
  }

  @UseGuards(IsLoggedIn)
  @Delete(":commentId")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() findByIdDto: FindByPostIdAndCommentIdDto) {
    return this.commentsService.delete(findByIdDto);
  }
}
