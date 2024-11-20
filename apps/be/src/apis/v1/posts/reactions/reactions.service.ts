import { Injectable } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import {
  FindByPostIdDto,
  FindByPostIdAndReactionIdDto,
} from "#be/apis/v1/posts/reactions/dtos/find-by-id.dto";
import { CreateReactionDto } from "#be/apis/v1/posts/reactions/dtos/create-reaction.dto";
import { UpdateReactionDto } from "#be/apis/v1/posts/reactions/dtos/update-reaction.dto";

@Injectable()
export class PostsReactionsService {
  constructor(private readonly prisma: PrismaService) {}

  /** 리액션 생성 */
  async create(
    userId: string,
    { postId }: FindByPostIdDto,
    createReactionDto: CreateReactionDto,
  ) {
    return await this.prisma.postReaction.create({
      data: {
        userId,
        postId,
        ...createReactionDto,
      },
    });
  }

  /** 리액션 수정 */
  async update(
    { postId, reactionId }: FindByPostIdAndReactionIdDto,
    updateReactionDto: UpdateReactionDto,
  ) {
    return await this.prisma.postReaction.update({
      where: { id: reactionId, postId },
      data: {
        ...updateReactionDto,
      },
    });
  }

  /** 리액션 삭제 */
  async delete({ postId, reactionId }: FindByPostIdAndReactionIdDto) {
    return await this.prisma.postReaction.delete({
      where: { id: reactionId, postId },
    });
  }
}
