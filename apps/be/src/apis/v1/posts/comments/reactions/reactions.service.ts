import { Injectable } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import {
  FindByPostIdAndCommentIdDto,
  FindByPostIdAndCommentIdAndReactionIdDto,
} from "#be/apis/v1/posts/comments/reactions/dtos/find-by-id.dto";
import { CreateReactionDto } from "#be/apis/v1/posts/comments/reactions/dtos/create-reaction.dto";
import { UpdateReactionDto } from "#be/apis/v1/posts/comments/reactions/dtos/update-reaction.dto";

@Injectable()
export class PostsCommentsReactionsService {
  constructor(private readonly prisma: PrismaService) {}

  /** 리액션 생성 */
  async create(
    userId: string,
    { postId, commentId }: FindByPostIdAndCommentIdDto,
    createReactionDto: CreateReactionDto,
  ) {
    return await this.prisma.commentReaction.create({
      data: {
        userId,
        postId,
        commentId,
        ...createReactionDto,
      },
    });
  }

  /** 리액션 수정 */
  async update(
    { postId, commentId, reactionId }: FindByPostIdAndCommentIdAndReactionIdDto,
    updateReactionDto: UpdateReactionDto,
  ) {
    return await this.prisma.commentReaction.update({
      where: { id: reactionId, postId, commentId },
      data: {
        ...updateReactionDto,
      },
    });
  }

  /** 리액션 삭제 */
  async delete({
    postId,
    commentId,
    reactionId,
  }: FindByPostIdAndCommentIdAndReactionIdDto) {
    return await this.prisma.commentReaction.delete({
      where: { id: reactionId, postId, commentId },
    });
  }
}
