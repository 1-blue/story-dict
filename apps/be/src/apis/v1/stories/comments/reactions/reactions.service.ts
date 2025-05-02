import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { StoriesCommentsService } from "#be/apis/v1/stories/comments/comments.service";
import {
  FindByStoryIdAndCommentIdDto,
  FindByStoryIdAndCommentIdAndReactionIdDto,
} from "#be/apis/v1/stories/comments/reactions/dtos/find-by-id.dto";
import { CreateReactionDto } from "#be/apis/v1/stories/comments/reactions/dtos/create-reaction.dto";
import { UpdateReactionDto } from "#be/apis/v1/stories/comments/reactions/dtos/update-reaction.dto";
import { HasReactionDto } from "#be/apis/v1/stories/comments/reactions/dtos/has-reaction.dto";

@Injectable()
export class StoriesCommentsReactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storiesCommentsService: StoriesCommentsService,
  ) {}

  /** 리액션 조회 */
  async getOne({
    storyId,
    commentId,
    reactionId,
  }: FindByStoryIdAndCommentIdAndReactionIdDto) {
    await this.storiesCommentsService.getOneById({ storyId, commentId });

    const exStoryReaction = await this.prisma.storyCommentReaction.findUnique({
      where: { id: reactionId, storyId, commentId },
    });

    if (!exStoryReaction) {
      throw new NotFoundException("리액션을 찾을 수 없습니다.");
    }

    return exStoryReaction;
  }

  /** 리액션 생성 */
  async create(
    userId: string,
    { storyId, commentId }: FindByStoryIdAndCommentIdDto,
    createReactionDto: CreateReactionDto,
  ) {
    await this.storiesCommentsService.getOneById({ storyId, commentId });

    const hasReaction = await this.hasReaction({ userId, storyId, commentId });

    if (hasReaction) {
      throw new ConflictException("이미 리액션이 존재합니다");
    }

    return await this.prisma.storyCommentReaction.create({
      data: {
        userId,
        storyId,
        commentId,
        ...createReactionDto,
      },
    });
  }

  /** 리액션 수정 */
  async update(
    {
      storyId,
      commentId,
      reactionId,
    }: FindByStoryIdAndCommentIdAndReactionIdDto,
    updateReactionDto: UpdateReactionDto,
  ) {
    const exStoryCommentReaction = await this.getOne({
      storyId,
      commentId,
      reactionId,
    });

    if (!exStoryCommentReaction) {
      throw new NotFoundException("이전 리액션이 존재하지 않습니다.");
    }
    if (exStoryCommentReaction.type === updateReactionDto.type) {
      throw new ConflictException("이전 리액션과 동일합니다.");
    }

    return await this.prisma.storyCommentReaction.update({
      where: { id: reactionId, storyId, commentId },
      data: {
        ...updateReactionDto,
      },
    });
  }

  /** 리액션 삭제 */
  async delete({
    storyId,
    commentId,
    reactionId,
  }: FindByStoryIdAndCommentIdAndReactionIdDto) {
    await this.getOne({ storyId, commentId, reactionId });

    return await this.prisma.storyCommentReaction.delete({
      where: { id: reactionId, storyId, commentId },
    });
  }

  /** 이미 리액션 가지고 있는지 확인 */
  async hasReaction({ userId, storyId, commentId }: HasReactionDto) {
    const existingReaction = await this.prisma.storyCommentReaction.findFirst({
      where: { userId, storyId, commentId },
    });

    return !!existingReaction;
  }
}
