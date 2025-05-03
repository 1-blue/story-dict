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
import { ApiCreatedResponse, ApiOperation, ApiResponse } from "@nestjs/swagger";

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
  GetAllStoryCommentParamDTO,
  GetAllStoryCommentResponseDTO,
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
  @ApiCreatedResponse({
    description: "이야기 댓글 생성 성공",
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
  @ApiResponse({
    status: 200,
    description: "이야기 댓글 조회 성공",
    type: GetOneByIdStoryCommentResponseDTO,
  })
  async getOneById(@Param() paramDTO: GetOneByIdStoryCommentParamDTO) {
    return {
      payload: await this.storiesCommentsService.getOneById(paramDTO),
    };
  }

  @Get()
  @ApiOperation({ summary: "이야기 댓글 조회" })
  @ApiResponse({
    status: 200,
    description: "이야기 댓글 조회 성공",
    type: GetAllStoryCommentResponseDTO,
  })
  async getAll(@Param() paramDTO: GetAllStoryCommentParamDTO) {
    return {
      payload: await this.storiesCommentsService.getAll(paramDTO),
    };
  }

  @UseGuards(IsLoggedIn)
  @Patch(":commentId")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "이야기 댓글 수정" })
  @ApiResponse({
    status: 200,
    description: "이야기 댓글 수정 성공",
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
  @ApiResponse({
    status: 200,
    description: "이야기 댓글 삭제 성공",
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
