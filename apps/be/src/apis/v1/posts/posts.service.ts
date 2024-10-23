import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { FindByIdDto } from "#be/dtos/find-by-id.dto";
import { CreatePostDto } from "#be/apis/v1/posts/dtos/create-post.dto";
import { UpdatePostDto } from "#be/apis/v1/posts/dtos/update-post.dto";
import { FindRandomPostDto } from "./dtos/find-random-post.dto";
import { FindKeywordPostDto } from "./dtos/find-keyword-post.dto";
import { FindCategoryPostDto } from "./dtos/find-category-post.dto";

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  /** 랜덤 선택 함수 */
  private randomPick<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]!;
  }

  /** 게시글 생성 */
  async create({ ...post }: CreatePostDto) {
    return await this.prismaService.post.create({
      data: {
        ...post,
      },
    });
  }

  /** 특정 게시글들 찾기 */
  async findAllSEO() {
    return await this.prismaService.post.findMany({
      select: {
        id: true,
        title: true,
        summary: true,
        category: true,
        updatedAt: true,
      },
    });
  }

  /** 특정 게시글들 찾기 */
  async findMany() {
    return await this.prismaService.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        thumbnail: {
          select: {
            url: true,
          },
        },
      },
    });
  }

  /** 특정 게시글 찾기 */
  async findOne({ id }: FindByIdDto) {
    const exPost = await this.prismaService.post.findUnique({
      where: { id },
      include: {
        thumbnail: {
          select: {
            id: true,
            url: true,
          },
        },
        user: {
          select: {
            id: true,
            nickname: true,
            image: {
              select: {
                id: true,
                url: true,
              },
            },
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

    if (!exPost) {
      throw new NotFoundException("찾는 게시글이 존재하지 않습니다.");
    }

    return exPost;
  }

  // TODO: findManyRandom 형식으로 이름 수정
  /** 랜덤 게시글 찾기 */
  async findRandom({ existingIds }: FindRandomPostDto) {
    const existingIdsArray = existingIds.split(",").map((id) => id.trim());

    const productsCount = await this.prismaService.post.count();
    const skip = Math.floor(Math.random() * productsCount);
    const orderBy = this.randomPick(["id", "title", "content", "createdAt"]);
    const orderDir = this.randomPick(["asc", "desc"]);
    const randomPost = await this.prismaService.post.findMany({
      where: {
        id: {
          notIn: existingIdsArray,
        },
      },
      orderBy: {
        [orderBy]: orderDir,
      },
      skip,
      take: 4,
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

    return randomPost;
  }

  /** 키워드 기반 게시글 찾기 */
  async findKeyword({ keyword }: FindKeywordPostDto) {
    const decodedKeyword = decodeURIComponent(keyword);

    const posts = await this.prismaService.post.findMany({
      where: {
        OR: [
          { title: { contains: decodedKeyword } },
          { content: { contains: decodedKeyword } },
        ],
      },
      include: {
        thumbnail: {
          select: {
            url: true,
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

    return posts;
  }

  /** 카테고리 기반 게시글 찾기 */
  async findCategory({ category }: FindCategoryPostDto) {
    const posts = await this.prismaService.post.findMany({
      where: {
        category,
      },
      include: {
        thumbnail: {
          select: {
            url: true,
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

    return posts;
  }

  /** 특정 게시글 수정 */
  async update({ id }: FindByIdDto, { ...post }: UpdatePostDto) {
    await this.findOne({ id });

    return await this.prismaService.post.update({
      where: { id },
      data: {
        ...post,
      },
    });
  }

  /** 특정 게시글 삭제 */
  async delete({ id }: FindByIdDto) {
    await this.findOne({ id });

    return await this.prismaService.post.delete({
      where: { id },
    });
  }
}
