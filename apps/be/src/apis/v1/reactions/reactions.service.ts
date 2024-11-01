import { Injectable } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { FindByReactionIdDto } from "#be/apis/v1/reactions/dtos/find-by-reaction-id.dto";
import { CreateReactionDto } from "#be/apis/v1/reactions/dtos/create-reaction.dto";
import { UpdateReactionDto } from "#be/apis/v1/reactions/dtos/update-reaction.dto";

@Injectable()
export class ReactionsService {
  constructor(private readonly prisma: PrismaService) {}

  /** 리액션 생성 */
  async create(userId: string, createReactionDto: CreateReactionDto) {
    return await this.prisma.reaction.create({
      data: {
        userId,
        ...createReactionDto,
      },
    });
  }

  /** 리액션 수정 */
  async update(
    { reactionId }: FindByReactionIdDto,
    updateReactionDto: UpdateReactionDto,
  ) {
    return await this.prisma.reaction.update({
      where: { id: reactionId },
      data: {
        ...updateReactionDto,
      },
    });
  }

  /** 리액션 삭제 */
  async delete({ reactionId }: FindByReactionIdDto) {
    return await this.prisma.reaction.delete({
      where: { id: reactionId },
    });
  }
}
