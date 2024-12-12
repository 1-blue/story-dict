import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { PostsCommentsService } from "#be/apis/v1/posts/comments/comments.service";
import {
  FindByPostIdAndCommentIdDto,
  FindByPostIdAndCommentIdAndReactionIdDto,
} from "#be/apis/v1/posts/comments/reactions/dtos/find-by-id.dto";
import { CreateReactionDto } from "#be/apis/v1/posts/comments/reactions/dtos/create-reaction.dto";
import { UpdateReactionDto } from "#be/apis/v1/posts/comments/reactions/dtos/update-reaction.dto";
import { HasReactionDto } from "#be/apis/v1/posts/comments/reactions/dtos/has-reaction.dto";

@Injectable()
export class PostsCommentsReactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly postsCommentsService: PostsCommentsService,
  ) {}

  /** 리액션 조회 */
  async getOne({
    postId,
    commentId,
    reactionId,
  }: FindByPostIdAndCommentIdAndReactionIdDto) {
    await this.postsCommentsService.getOne({ postId, commentId });

    const exPostReaction = await this.prisma.commentReaction.findUnique({
      where: { id: reactionId, postId, commentId },
    });

    if (!exPostReaction) {
      throw new NotFoundException("리액션을 찾을 수 없습니다.");
    }

    return exPostReaction;
  }

  /** 리액션 생성 */
  async create(
    userId: string,
    { postId, commentId }: FindByPostIdAndCommentIdDto,
    createReactionDto: CreateReactionDto,
  ) {
    await this.postsCommentsService.getOne({ postId, commentId });

    const hasReaction = await this.hasReaction({ userId, postId, commentId });

    if (hasReaction) {
      throw new ConflictException("이미 리액션이 존재합니다");
    }

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
    const exPostCommentReaction = await this.getOne({
      postId,
      commentId,
      reactionId,
    });

    if (!exPostCommentReaction) {
      throw new NotFoundException("이전 리액션이 존재하지 않습니다.");
    }
    if (exPostCommentReaction.type === updateReactionDto.type) {
      throw new ConflictException("이전 리액션과 동일합니다.");
    }

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
    await this.getOne({ postId, commentId, reactionId });

    return await this.prisma.commentReaction.delete({
      where: { id: reactionId, postId, commentId },
    });
  }

  /** 이미 리액션 가지고 있는지 확인 */
  async hasReaction({ userId, postId, commentId }: HasReactionDto) {
    const existingReaction = await this.prisma.commentReaction.findFirst({
      where: { userId, postId, commentId },
    });

    return !!existingReaction;
  }
}
