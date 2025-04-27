import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { StoriesService } from "#be/apis/v1/stories/stories.service";
import type { CreateCommentDto } from "#be/apis/v1/stories/comments/dtos/create-comment.dto";
import type { UpdateCommentDto } from "#be/apis/v1/stories/comments/dtos/update-comment.dto";
import {
  FindByStoryIdAndCommentIdDto,
  FindByStoryIdDto,
} from "#be/apis/v1/stories/comments/dtos/find-by-id.dto";

@Injectable()
export class StoriesCommentsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storiesService: StoriesService,
  ) {}

  async create(
    userId: string,
    { storyId }: FindByStoryIdDto,
    createCommentDto: CreateCommentDto,
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

  async findMany({ storyId }: FindByStoryIdDto) {
    await this.storiesService.getOne({ storyId });

    return this.prismaService.storyComment.findMany({
      where: {
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
  }

  async update(
    { storyId, commentId }: FindByStoryIdAndCommentIdDto,
    updateCommentDto: UpdateCommentDto,
  ) {
    await this.getOne({ storyId, commentId });

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

  async delete({ storyId, commentId }: FindByStoryIdAndCommentIdDto) {
    await this.getOne({ storyId, commentId });

    return this.prismaService.storyComment.delete({
      where: { storyId, id: commentId },
    });
  }

  async getOne({ storyId, commentId }: FindByStoryIdAndCommentIdDto) {
    await this.storiesService.getOne({ storyId });

    const exStoryComment = await this.prismaService.storyComment.findUnique({
      where: { storyId, id: commentId },
    });

    if (!exStoryComment) {
      throw new NotFoundException("댓글이 존재하지 않습니다.");
    }

    return exStoryComment;
  }
}
