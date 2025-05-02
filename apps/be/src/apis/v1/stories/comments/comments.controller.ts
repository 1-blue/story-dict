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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from "@nestjs/swagger";

import { IsLoggedIn } from "#be/guards";
import { StoriesCommentsService } from "#be/apis/v1/stories/comments/comments.service";
import {
  CreateStoryCommentBodyDTO,
  CreateStoryCommentParamDTO,
  CreateStoryCommentResponseDTO,
  UpdateStoryCommentBodyDTO,
  UpdateStoryCommentParamDTO,
  UpdateStoryCommentResponseDTO,
  GetOneByIdStoryCommentParamDTO,
  GetOneByIdStoryCommentResponseDTO,
  DeleteStoryCommentParamDTO,
  DeleteStoryCommentResponseDTO,
} from "#be/apis/v1/stories/comments/dtos";

@Controller("apis/v1/stories/:storyId/comments")
export class StoriesCommentsController {
  constructor(
    private readonly storiesCommentsService: StoriesCommentsService,
  ) {}

  @UseGuards(IsLoggedIn)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "이야기 댓글 생성" })
  @ApiParam({
    name: "storyId",
    type: CreateStoryCommentParamDTO,
  })
  @ApiBody({ type: CreateStoryCommentBodyDTO })
  @ApiCreatedResponse({
    type: CreateStoryCommentResponseDTO,
  })
  async create(
    @Req() req: Request,
    @Param() paramDTO: CreateStoryCommentParamDTO,
    @Body() bodyDTO: CreateStoryCommentBodyDTO,
  ) {
    return {
      toast: {
        title: "댓글 작성 완료",
        description: `댓글을 작성했습니다.`,
      },
      payload: await this.storiesCommentsService.create(
        req.user!.id,
        paramDTO,
        bodyDTO,
      ),
    };
  }

  @Get()
  @ApiOperation({ summary: "이야기 댓글 조회" })
  @ApiParam({
    name: "storyId",
    type: GetOneByIdStoryCommentParamDTO,
  })
  @ApiResponse({
    type: GetOneByIdStoryCommentResponseDTO,
  })
  async getOneById(@Param() findByIdDto: GetOneByIdStoryCommentParamDTO) {
    return {
      payload: await this.storiesCommentsService.getOneById(findByIdDto),
    };
  }

  @UseGuards(IsLoggedIn)
  @Patch(":commentId")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "이야기 댓글 수정" })
  @ApiParam({
    name: "commentId",
    type: UpdateStoryCommentParamDTO,
  })
  @ApiBody({ type: UpdateStoryCommentBodyDTO })
  @ApiResponse({
    type: UpdateStoryCommentResponseDTO,
  })
  async update(
    @Param() paramDTO: UpdateStoryCommentParamDTO,
    @Body() bodyDTO: UpdateStoryCommentBodyDTO,
  ) {
    return {
      toast: {
        title: "댓글 수정 완료",
        description: `댓글을 수정했습니다.`,
      },
      payload: await this.storiesCommentsService.update(paramDTO, bodyDTO),
    };
  }

  @UseGuards(IsLoggedIn)
  @Delete(":commentId")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "이야기 댓글 삭제" })
  @ApiParam({
    name: "commentId",
    type: DeleteStoryCommentParamDTO,
  })
  @ApiResponse({
    type: DeleteStoryCommentResponseDTO,
  })
  async delete(@Param() paramDTO: DeleteStoryCommentParamDTO) {
    return {
      toast: {
        title: "댓글 삭제 완료",
        description: `댓글을 삭제했습니다.`,
      },
      payload: await this.storiesCommentsService.delete(paramDTO),
    };
  }
}
