import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { CreatePostDto } from "#be/apis/v1/posts/dtos/create-post.dto";
import { UpdatePostDto } from "#be/apis/v1/posts/dtos/update-post.dto";
import { FindByPostIdDto } from "#be/apis/v1/posts/dtos/find-by-id.dto";
import { GetManyRandomPostDto } from "#be/apis/v1/posts/dtos/get-many-random-post.dto";
import { FindKeywordPostDto } from "#be/apis/v1/posts/dtos/find-keyword-post.dto";
import { GetAllCategoryPostDto } from "#be/apis/v1/posts/dtos/get-all-category-post.dto";

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  /** 랜덤 선택 함수 */
  private randomPick<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]!;
  }

  /** 게시글 생성 */
  async create(userId: string, { ...post }: CreatePostDto) {
    return await this.prismaService.post.create({
      data: {
        ...post,
        userId,
      },
    });
  }

  /** 모든 게시글 찾기 */
  async getAll() {
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
  async getOne({ postId }: FindByPostIdDto) {
    const exPost = await this.prismaService.post.findUnique({
      where: { id: postId },
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

  /** 랜덤 게시글 찾기 */
  async getManyRandom({ existingIds }: GetManyRandomPostDto) {
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
  async getManyKeyword({ keyword }: FindKeywordPostDto) {
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
  async getAllCategory({ category }: GetAllCategoryPostDto) {
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
  async update({ postId }: FindByPostIdDto, { ...post }: UpdatePostDto) {
    await this.getOne({ postId });

    return await this.prismaService.post.update({
      where: { id: postId },
      data: {
        ...post,
      },
    });
  }

  /** 특정 게시글 삭제 */
  async delete({ postId }: FindByPostIdDto) {
    await this.getOne({ postId });

    return await this.prismaService.post.delete({
      where: { id: postId },
    });
  }
}
