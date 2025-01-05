import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { PostsService } from "#be/apis/v1/posts/posts.service";
import type { CreateCommentDto } from "#be/apis/v1/posts/comments/dtos/create-comment.dto";
import type { UpdateCommentDto } from "#be/apis/v1/posts/comments/dtos/update-comment.dto";
import {
  FindByPostIdAndCommentIdDto,
  FindByPostIdDto,
} from "#be/apis/v1/posts/comments/dtos/find-by-id.dto";

@Injectable()
export class PostsCommentsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly postsService: PostsService,
  ) {}

  async create(
    userId: string,
    { postId }: FindByPostIdDto,
    createCommentDto: CreateCommentDto,
  ) {
    await this.postsService.getOne({ postId });

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
    await this.postsService.getOne({ postId });

    return this.prismaService.comment.findMany({
      where: {
        postId,
      },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
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
    await this.getOne({ postId, commentId });

    return this.prismaService.comment.update({
      where: { postId, id: commentId },
      data: updateCommentDto,
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
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
    await this.getOne({ postId, commentId });

    return this.prismaService.comment.delete({
      where: { postId, id: commentId },
    });
  }

  async getOne({ postId, commentId }: FindByPostIdAndCommentIdDto) {
    await this.postsService.getOne({ postId });

    const exPostComment = await this.prismaService.comment.findUnique({
      where: { postId, id: commentId },
    });

    if (!exPostComment) {
      throw new NotFoundException("댓글이 존재하지 않습니다.");
    }

    return exPostComment;
  }
}
