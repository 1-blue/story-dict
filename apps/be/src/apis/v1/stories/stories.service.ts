import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { ImagesService } from "#be/apis/v1/images/images.service";
import { CreateStoryDto } from "#be/apis/v1/stories/dtos/create-story.dto";
import { UpdateStoryDto } from "#be/apis/v1/stories/dtos/update-story.dto";
import { FindByStoryIdDto } from "#be/apis/v1/stories/dtos/find-by-id.dto";
import { GetManyRandomStoryDto } from "#be/apis/v1/stories/dtos/get-many-random-story.dto";
import { FindKeywordStoryDto } from "#be/apis/v1/stories/dtos/find-keyword-story.dto";
import { GetAllCategoryStoryDto } from "#be/apis/v1/stories/dtos/get-all-category-story.dto";
import { CheckUniqueTitleDto } from "#be/apis/v1/stories/dtos/check-unique-title.dto";
import { GetOneStoryByTitleDto } from "#be/apis/v1/stories/dtos/get-one-by-story-title.dto";

@Injectable()
export class StoriesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly imagesService: ImagesService,
  ) {}

  // ============================================
  // CRUD 기본 작업
  // ============================================

  /** 이야기 생성 */
  async create(userId: string, storyData: CreateStoryDto) {
    await this.validateUniqueTitle(storyData.title);
    const thumbnailPath = await this.handleThumbnailUpload(
      storyData.thumbnailPath,
    );

    return this.prismaService.story.create({
      data: {
        ...storyData,
        thumbnailPath,
        userId,
      },
    });
  }

  /** 특정 이야기 수정 */
  async update(findDto: FindByStoryIdDto, updateData: UpdateStoryDto) {
    const originalStory = await this.getOne(findDto);

    if (this.isTitleChanged(originalStory.title, updateData.title)) {
      await this.validateUniqueTitle(updateData.title!);
    }

    const thumbnailPath = await this.handleThumbnailUpdate(
      originalStory.thumbnailPath,
      updateData.thumbnailPath,
    );

    return this.prismaService.story.update({
      where: { id: findDto.storyId },
      data: {
        ...updateData,
        thumbnailPath,
      },
    });
  }

  /** 특정 이야기 삭제 */
  async delete(findDto: FindByStoryIdDto) {
    const story = await this.getOne(findDto);

    if (story.thumbnailPath) {
      await this.moveImageToDeleted(story.thumbnailPath);
    }

    return this.prismaService.story.delete({
      where: { id: findDto.storyId },
    });
  }

  // ============================================
  // 조회 작업
  // ============================================

  /** 모든 이야기 조회 */
  async getAll() {
    return this.prismaService.story.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  /** ID로 특정 이야기 조회 */
  async getOne(findDto: FindByStoryIdDto) {
    const story = await this.prismaService.story.findUnique({
      where: { id: findDto.storyId },
      include: this.getStoryIncludeOptions(),
    });

    if (!story) {
      throw new NotFoundException("찾는 이야기가 존재하지 않습니다.");
    }

    return story;
  }

  /** 제목으로 특정 이야기 조회 */
  async getOneByTitle(findDto: GetOneStoryByTitleDto) {
    const story = await this.prismaService.story.findUnique({
      where: { title: findDto.title },
      include: this.getStoryIncludeOptions(),
    });

    if (!story) {
      throw new NotFoundException("찾는 이야기가 존재하지 않습니다.");
    }

    return story;
  }

  /** 랜덤 이야기 조회 */
  async getManyRandom(dto: GetManyRandomStoryDto) {
    const existingIds = this.parseExistingIds(dto.existingIds);

    const availableStories = await this.prismaService.story.findMany({
      where: { id: { notIn: existingIds } },
      include: this.getReactionIncludeOptions(),
    });

    return this.shuffleAndSlice(availableStories, 4);
  }

  /** 키워드로 이야기 검색 */
  async getManyKeyword(dto: FindKeywordStoryDto) {
    const keyword = decodeURIComponent(dto.keyword);

    return this.prismaService.story.findMany({
      where: {
        OR: [
          { title: { contains: keyword } },
          { content: { contains: keyword } },
        ],
      },
      include: this.getReactionIncludeOptions(),
    });
  }

  /** 카테고리별 이야기 조회 */
  async getAllCategory(dto: GetAllCategoryStoryDto) {
    return this.prismaService.story.findMany({
      where: { category: dto.category },
      include: this.getReactionIncludeOptions(),
    });
  }

  // ============================================
  // 유틸리티 작업
  // ============================================

  /** 제목 중복 검증 */
  async checkUniqueTitle(dto: CheckUniqueTitleDto) {
    const existingStory = await this.prismaService.story.findUnique({
      where: { title: dto.title },
    });

    return { isUnique: !existingStory };
  }

  // ============================================
  // 프라이빗 헬퍼 메서드
  // ============================================

  /** 스토리 조회 시 포함할 관계 데이터 설정 */
  private getStoryIncludeOptions() {
    return {
      user: {
        select: {
          id: true,
          nickname: true,
          imagePath: true,
        },
      },
      reactions: this.getReactionSelectOptions(),
    };
  }

  /** 반응 조회 시 포함할 옵션 설정 */
  private getReactionIncludeOptions() {
    return {
      reactions: this.getReactionSelectOptions(),
    };
  }

  /** 반응 필드 선택 옵션 */
  private getReactionSelectOptions() {
    return {
      select: {
        id: true,
        type: true,
        userId: true,
      },
    };
  }

  /** 제목 중복 검증 및 예외 처리 */
  private async validateUniqueTitle(title: string): Promise<void> {
    const { isUnique } = await this.checkUniqueTitle({ title });

    if (!isUnique) {
      throw new ConflictException("이미 존재하는 제목입니다.");
    }
  }

  /** 썸네일 업로드 처리 */
  private async handleThumbnailUpload(
    thumbnailPath?: string,
  ): Promise<string | null> {
    if (!thumbnailPath) return null;

    const { payload } = await this.imagesService.move({
      imagePath: thumbnailPath,
      beforeStatus: "temp",
      afterStatus: "use",
    });

    return payload.imagePath;
  }

  /** 썸네일 업데이트 처리 */
  private async handleThumbnailUpdate(
    originalPath: string | null,
    newPath?: string,
  ): Promise<string | null> {
    if (!newPath) return originalPath;

    // 기존 이미지가 있으면 삭제 폴더로 이동
    if (originalPath) {
      await this.moveImageToDeleted(originalPath);
    }

    // 새 이미지를 사용 폴더로 이동
    return this.handleThumbnailUpload(newPath);
  }

  /** 이미지를 삭제 폴더로 이동 */
  private async moveImageToDeleted(imagePath: string): Promise<void> {
    await this.imagesService.move({
      imagePath,
      beforeStatus: "use",
      afterStatus: "deleted",
    });
  }

  /** 제목 변경 여부 확인 */
  private isTitleChanged(originalTitle: string, newTitle?: string): boolean {
    return newTitle !== undefined && originalTitle !== newTitle;
  }

  /** 기존 ID 문자열 파싱 */
  private parseExistingIds(existingIds: string): string[] {
    return existingIds.split(",").map((id) => id.trim());
  }

  /** 배열 셔플 및 슬라이스 (Fisher-Yates 알고리즘) */
  private shuffleAndSlice<T>(array: T[], count: number): T[] {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
    }

    return shuffled.slice(0, count);
  }
}
