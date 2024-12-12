import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { PostsService } from "#be/apis/v1/posts/posts.service";
import {
  FindByPostIdDto,
  FindByPostIdAndReactionIdDto,
} from "#be/apis/v1/posts/reactions/dtos/find-by-id.dto";
import { CreateReactionDto } from "#be/apis/v1/posts/reactions/dtos/create-reaction.dto";
import { UpdateReactionDto } from "#be/apis/v1/posts/reactions/dtos/update-reaction.dto";
import { HasReactionDto } from "#be/apis/v1/posts/reactions/dtos/has-reaction.dto";

@Injectable()
export class PostsReactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly postsService: PostsService,
  ) {}

  /** 리액션 조회 */
  async getOne({ postId, reactionId }: FindByPostIdAndReactionIdDto) {
    await this.postsService.getOne({ postId });

    const exPostReaction = await this.prisma.postReaction.findUnique({
      where: { id: reactionId, postId },
    });

    if (!exPostReaction) {
      throw new NotFoundException("리액션을 찾을 수 없습니다.");
    }

    return exPostReaction;
  }

  /** 리액션 생성 */
  async create(
    userId: string,
    { postId }: FindByPostIdDto,
    createReactionDto: CreateReactionDto,
  ) {
    await this.postsService.getOne({ postId });

    const hasReaction = await this.hasReaction({ userId, postId });

    if (hasReaction) {
      throw new ConflictException("이미 리액션이 존재합니다");
    }

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
    const exPostReaction = await this.getOne({ postId, reactionId });

    if (!exPostReaction) {
      throw new NotFoundException("이전 리액션이 존재하지 않습니다.");
    }
    if (exPostReaction.type === updateReactionDto.type) {
      throw new ConflictException("이전 리액션과 동일합니다.");
    }

    return await this.prisma.postReaction.update({
      where: { id: reactionId, postId },
      data: {
        ...updateReactionDto,
      },
    });
  }

  /** 리액션 삭제 */
  async delete({ postId, reactionId }: FindByPostIdAndReactionIdDto) {
    await this.getOne({ postId, reactionId });

    return await this.prisma.postReaction.delete({
      where: { id: reactionId, postId },
    });
  }

  /** 이미 리액션 가지고 있는지 확인 */
  async hasReaction({ userId, postId }: HasReactionDto) {
    const existingReaction = await this.prisma.postReaction.findFirst({
      where: { userId, postId },
    });

    return !!existingReaction;
  }
}
