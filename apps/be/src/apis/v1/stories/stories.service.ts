import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { ImagesService } from "#be/apis/v1/images/images.service";
import {
  CreateStoryBodyDTO,
  UpdateStoryBodyDTO,
  UpdateStoryParamDTO,
  GetManyRandomStoryQueryDTO,
  GetManyByKeywordParamDTO,
  GetAllStoryByCategoryParamDTO,
  CheckUniqueTitleBodyDTO,
  GetOneStoryByTitleParamDTO,
  GetOneStoryByIdParamDTO,
  DeleteStoryParamDTO,
} from "#be/apis/v1/stories/dtos";

@Injectable()
export class StoriesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly imagesService: ImagesService,
  ) {}

  /** 이야기 생성 */
  async create(userId: string, story: CreateStoryBodyDTO) {
    const { isUnique } = await this.checkUniqueTitle({ title: story.title });

    if (!isUnique) throw new ConflictException("이미 존재하는 제목입니다.");

    let thumbnailPath = story.thumbnailPath;
    // 썸네일이 존재한다면 이미지 이동
    if (story.thumbnailPath) {
      const { imagePath } = await this.imagesService.move({
        imagePath: story.thumbnailPath,
        beforeStatus: "temp",
        afterStatus: "use",
      });
      thumbnailPath = imagePath;
    }

    return await this.prismaService.story.create({
      data: {
        ...story,
        thumbnailPath,
        userId,
      },
    });
  }

  /** 모든 이야기 찾기 */
  async getAll() {
    return await this.prismaService.story.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  /** 특정 이야기 찾기 */
  async getOne({ storyId }: GetOneStoryByIdParamDTO) {
    const exStory = await this.prismaService.story.findUnique({
      where: { id: storyId },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            imagePath: true,
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

    if (!exStory) {
      throw new NotFoundException("찾는 이야기이 존재하지 않습니다.");
    }

    return exStory;
  }

  /** 제목으로 특정 이야기 찾기 */
  async getOneByTitle({ title }: GetOneStoryByTitleParamDTO) {
    const exStory = await this.prismaService.story.findUnique({
      where: { title },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            imagePath: true,
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

    if (!exStory) {
      throw new NotFoundException("찾는 이야기이 존재하지 않습니다.");
    }

    return exStory;
  }

  /** (FIXME: 비효율) 랜덤 이야기 찾기 */
  async getManyRandom({ existingIds }: GetManyRandomStoryQueryDTO) {
    const existingIdsArray = existingIds.split(",").map((id) => id.trim());

    // 1. 먼저 조건에 맞는 모든 이야기를 가져옵니다
    const availableStories = await this.prismaService.story.findMany({
      where: {
        id: {
          notIn: existingIdsArray,
        },
      },
      include: {
        reactions: {
          select: {
            id: true,
            type: true,
            userId: true,
          },
        },
      },
    });

    // 2. Fisher-Yates 셔플 알고리즘을 사용하여 배열을 무작위로 섞습니다
    for (let i = availableStories.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableStories[i], availableStories[j]] = [
        availableStories[j]!,
        availableStories[i]!,
      ];
    }

    // 3. 앞에서부터 4개만 반환합니다
    return availableStories.slice(0, 4);
  }

  /** 키워드 기반 이야기 찾기 */
  async getManyKeyword({ keyword }: GetManyByKeywordParamDTO) {
    const decodedKeyword = decodeURIComponent(keyword);

    const stories = await this.prismaService.story.findMany({
      where: {
        OR: [
          { title: { contains: decodedKeyword } },
          { content: { contains: decodedKeyword } },
        ],
      },
      include: {
        reactions: {
          select: {
            id: true,
            type: true,
            userId: true,
          },
        },
      },
    });

    return stories;
  }

  /** 카테고리 기반 이야기 찾기 */
  async getAllCategory({ category }: GetAllStoryByCategoryParamDTO) {
    const stories = await this.prismaService.story.findMany({
      where: {
        category,
      },
      include: {
        reactions: {
          select: {
            id: true,
            type: true,
            userId: true,
          },
        },
      },
    });

    return stories;
  }

  /** 특정 이야기 수정 */
  async update(
    { storyId }: UpdateStoryParamDTO,
    { ...story }: UpdateStoryBodyDTO,
  ) {
    const originalStory = await this.getOne({ storyId });

    const isTitleChanged = originalStory.title !== story.title;

    if (isTitleChanged) {
      if (story.title) {
        const { isUnique } = await this.checkUniqueTitle({
          title: story.title,
        });

        if (!isUnique) throw new ConflictException("이미 존재하는 제목입니다.");
      }
    }

    let thumbnailPath = originalStory.thumbnailPath;
    // 썸네일 업로드했다면
    if (story.thumbnailPath) {
      // 기존 이미지가 존재하면 제거 폴더로 이동
      if (originalStory.thumbnailPath) {
        await this.imagesService.move({
          imagePath: originalStory.thumbnailPath,
          beforeStatus: "use",
          afterStatus: "deleted",
        });
      }

      // 새로운 이미지 사용 폴더로 이동
      const { imagePath } = await this.imagesService.move({
        imagePath: story.thumbnailPath,
        beforeStatus: "temp",
        afterStatus: "use",
      });

      thumbnailPath = imagePath;
    }

    return await this.prismaService.story.update({
      where: { id: storyId },
      data: {
        ...story,
        thumbnailPath,
      },
    });
  }

  /** 특정 이야기 삭제 */
  async delete({ storyId }: DeleteStoryParamDTO) {
    const exStory = await this.getOne({ storyId });

    // S3 이미지 제거 폴더로 이동
    if (exStory.thumbnailPath) {
      await this.imagesService.move({
        imagePath: exStory.thumbnailPath,
        beforeStatus: "use",
        afterStatus: "deleted",
      });
    }

    return await this.prismaService.story.delete({
      where: { id: storyId },
    });
  }

  /** 제목 유니크값 검증 */
  async checkUniqueTitle({ title }: CheckUniqueTitleBodyDTO) {
    const exStory = await this.prismaService.story.findUnique({
      where: { title },
    });

    return { isUnique: !exStory };
  }
}
