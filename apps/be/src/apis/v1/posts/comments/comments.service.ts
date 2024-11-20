import { Injectable } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import type { CreateCommentDto } from "#be/apis/v1/posts/comments/dtos/create-comment.dto";
import type { UpdateCommentDto } from "#be/apis/v1/posts/comments/dtos/update-comment.dto";
import {
  FindByPostIdAndCommentIdDto,
  FindByPostIdDto,
} from "#be/apis/v1/posts/comments/dtos/find-by-id.dto";

@Injectable()
export class PostsCommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    userId: string,
    { postId }: FindByPostIdDto,
    createCommentDto: CreateCommentDto,
  ) {
    return this.prismaService.comment.create({
      data: {
        ...createCommentDto,
        postId,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            image: {
              select: {
                id: true,
                url: true,
              },
            },
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

  async findMany({ postId }: FindByPostIdDto) {
    return this.prismaService.comment.findMany({
      where: {
        postId,
      },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            image: {
              select: {
                id: true,
                url: true,
              },
            },
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
    { postId, commentId }: FindByPostIdAndCommentIdDto,
    updateCommentDto: UpdateCommentDto,
  ) {
    return this.prismaService.comment.update({
      where: { postId, id: commentId },
      data: updateCommentDto,
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            image: {
              select: {
                id: true,
                url: true,
              },
            },
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

  async delete({ postId, commentId }: FindByPostIdAndCommentIdDto) {
    return this.prismaService.comment.delete({
      where: { postId, id: commentId },
    });
  }
}
