import { Injectable } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import type { FindByIdDto } from "#be/dtos/find-by-id.dto";
import type { CreateCommentDto } from "#be/apis/v1/comments/dtos/create-comment.dto";
import type { UpdateCommentDto } from "#be/apis/v1/comments/dtos/update-comment.dto";

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string, createCommentDto: CreateCommentDto) {
    return this.prismaService.comment.create({
      data: {
        ...createCommentDto,
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

  async findMany({ id }: FindByIdDto) {
    return this.prismaService.comment.findMany({
      where: {
        postId: id,
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

  async update({ id }: FindByIdDto, updateCommentDto: UpdateCommentDto) {
    return this.prismaService.comment.update({
      where: { id },
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

  async delete({ id }: FindByIdDto) {
    return this.prismaService.comment.delete({
      where: { id },
    });
  }
}
