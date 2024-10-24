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

import { FindByIdDto } from "#be/dtos/find-by-id.dto";
import { CommentsService } from "#be/apis/v1/comments/comments.service";
import { CreateCommentDto } from "#be/apis/v1/comments/dtos/create-comment.dto";
import { UpdateCommentDto } from "#be/apis/v1/comments/dtos/update-comment.dto";
import { IsLoggedIn } from "#be/guards";
import type { Request } from "express";

@Controller("apis/v1/comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(IsLoggedIn)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Req() req: Request, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(req.user!.id, createCommentDto);
  }

  @Get(":id")
  findMany(@Param() findByIdDto: FindByIdDto) {
    return this.commentsService.findMany(findByIdDto);
  }

  @UseGuards(IsLoggedIn)
  @Patch(":id")
  update(
    @Param() findByIdDto: FindByIdDto,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(findByIdDto, updateCommentDto);
  }

  @UseGuards(IsLoggedIn)
  @Delete(":id")
  delete(@Param() findByIdDto: FindByIdDto) {
    return this.commentsService.delete(findByIdDto);
  }
}
