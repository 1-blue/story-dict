import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { StoriesService } from "#be/apis/v1/stories/stories.service";
import type {
  CreateStoryCommentBodyDTO,
  CreateStoryCommentParamDTO,
  DeleteStoryCommentParamDTO,
  GetOneByIdStoryCommentParamDTO,
  UpdateStoryCommentBodyDTO,
  UpdateStoryCommentParamDTO,
} from "#be/apis/v1/stories/comments/dtos";
@Injectable()
export class StoriesCommentsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storiesService: StoriesService,
  ) {}

  async create(
    userId: string,
    { storyId }: CreateStoryCommentParamDTO,
    createCommentDto: CreateStoryCommentBodyDTO,
  ) {
    await this.storiesService.getOne({ storyId });

    return this.prismaService.storyComment.create({
      data: {
        ...createCommentDto,
        storyId,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            imagePath: true,
          },
        },
        reactions: {
          select: {
            id: true,
            type: true,
            userId: true,
          },
        },
      },
    });
  }

  async getOneById({ storyId, commentId }: GetOneByIdStoryCommentParamDTO) {
    await this.storiesService.getOne({ storyId });

    const exStoryComment = await this.prismaService.storyComment.findUnique({
      where: {
        id: commentId,
        storyId,
      },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            imagePath: true,
          },
        },
        reactions: {
          select: {
            id: true,
            type: true,
            userId: true,
          },
        },
      },
    });

    if (!exStoryComment) {
      throw new NotFoundException("댓글이 존재하지 않습니다.");
    }

    return exStoryComment;
  }

  async update(
    { storyId, commentId }: UpdateStoryCommentParamDTO,
    updateCommentDto: UpdateStoryCommentBodyDTO,
  ) {
    await this.getOneById({ storyId, commentId });

    return this.prismaService.storyComment.update({
      where: { storyId, id: commentId },
      data: updateCommentDto,
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            imagePath: true,
          },
        },
        reactions: {
          select: {
            id: true,
            type: true,
            userId: true,
          },
        },
      },
    });
  }

  async delete({ storyId, commentId }: DeleteStoryCommentParamDTO) {
    await this.getOneById({ storyId, commentId });

    return this.prismaService.storyComment.delete({
      where: { storyId, id: commentId },
    });
  }
}
