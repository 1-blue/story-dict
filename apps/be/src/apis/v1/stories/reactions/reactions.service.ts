import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { StoriesService } from "#be/apis/v1/stories/stories.service";
import {
  CreateStoryReactionBodyDTO,
  CreateStoryReactionParamDTO,
  UpdateStoryReactionBodyDTO,
  UpdateStoryReactionParamDTO,
  DeleteStoryReactionParamDTO,
} from "#be/apis/v1/stories/reactions/dtos";
import {
  GetOneByIdStoryReactionParamDTO,
  HasReactionDTO,
} from "#be/apis/v1/stories/reactions/dtos/internals";

@Injectable()
export class StoriesReactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storiesService: StoriesService,
  ) {}

  /** 리액션 조회 */
  async getOne({ storyId, reactionId }: GetOneByIdStoryReactionParamDTO) {
    await this.storiesService.getOne({ storyId });

    const exStoryReaction = await this.prisma.storyReaction.findUnique({
      where: { id: reactionId, storyId },
    });

    if (!exStoryReaction) {
      throw new NotFoundException("리액션을 찾을 수 없습니다.");
    }

    return exStoryReaction;
  }

  /** 리액션 생성 */
  async create(
    userId: string,
    { storyId }: CreateStoryReactionParamDTO,
    createReactionDto: CreateStoryReactionBodyDTO,
  ) {
    await this.storiesService.getOne({ storyId });

    const hasReaction = await this.hasReaction({ userId, storyId });

    if (hasReaction) {
      throw new ConflictException("이미 리액션이 존재합니다");
    }

    return await this.prisma.storyReaction.create({
      data: {
        userId,
        storyId,
        ...createReactionDto,
      },
    });
  }

  /** 리액션 수정 */
  async update(
    { storyId, reactionId }: UpdateStoryReactionParamDTO,
    updateReactionDto: UpdateStoryReactionBodyDTO,
  ) {
    const exStoryReaction = await this.getOne({ storyId, reactionId });

    if (!exStoryReaction) {
      throw new NotFoundException("이전 리액션이 존재하지 않습니다.");
    }
    if (exStoryReaction.type === updateReactionDto.type) {
      throw new ConflictException("이전 리액션과 동일합니다.");
    }

    return await this.prisma.storyReaction.update({
      where: { id: reactionId, storyId },
      data: {
        ...updateReactionDto,
      },
    });
  }

  /** 리액션 삭제 */
  async delete({ storyId, reactionId }: DeleteStoryReactionParamDTO) {
    await this.getOne({ storyId, reactionId });

    return await this.prisma.storyReaction.delete({
      where: { id: reactionId, storyId },
    });
  }

  /** 이미 리액션 가지고 있는지 확인 */
  async hasReaction({ userId, storyId }: HasReactionDTO) {
    const existingReaction = await this.prisma.storyReaction.findFirst({
      where: { userId, storyId },
    });

    return !!existingReaction;
  }
}
