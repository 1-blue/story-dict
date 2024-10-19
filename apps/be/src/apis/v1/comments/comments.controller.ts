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
} from "@nestjs/common";

import { FindByIdDto } from "#be/dtos/find-by-id.dto";
import { CommentsService } from "#be/apis/v1/comments/comments.service";
import { CreateCommentDto } from "#be/apis/v1/comments/dtos/create-comment.dto";
import { UpdateCommentDto } from "#be/apis/v1/comments/dtos/update-comment.dto";
import { IsLoggedIn } from "#be/guards";

@Controller("apis/v1/comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(IsLoggedIn)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @UseGuards(IsLoggedIn)
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
