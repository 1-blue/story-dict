import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { CreatePostDto } from "#be/apis/v1/posts/dtos/create-post.dto";
import { UpdatePostDto } from "#be/apis/v1/posts/dtos/update-post.dto";
import { FindByPostIdDto } from "#be/apis/v1/posts/dtos/find-by-id.dto";
import { GetManyRandomPostDto } from "#be/apis/v1/posts/dtos/get-many-random-post.dto";
import { FindKeywordPostDto } from "#be/apis/v1/posts/dtos/find-keyword-post.dto";
import { GetAllCategoryPostDto } from "#be/apis/v1/posts/dtos/get-all-category-post.dto";
import { CheckUniqueTitleDto } from "#be/apis/v1/posts/dtos/check-unique-title.dto";
import { GetOnePostByTitleDto } from "#be/apis/v1/posts/dtos/get-one-by-post-title.dto";

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  /** 게시글 생성 */
  async create(userId: string, { ...post }: CreatePostDto) {
    const { isUnique } = await this.checkUniqueTitle({ title: post.title });

    if (!isUnique) throw new ConflictException("이미 존재하는 제목입니다.");

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

  /** 제목으로 특정 게시글 찾기 */
  async getOneByTitle({ title }: GetOnePostByTitleDto) {
    const exPost = await this.prismaService.post.findUnique({
      where: { title },
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

  /** (FIXME: 비효율) 랜덤 게시글 찾기 */
  async getManyRandom({ existingIds }: GetManyRandomPostDto) {
    const existingIdsArray = existingIds.split(",").map((id) => id.trim());

    // 1. 먼저 조건에 맞는 모든 게시글을 가져옵니다
    const availablePosts = await this.prismaService.post.findMany({
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
    for (let i = availablePosts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availablePosts[i], availablePosts[j]] = [
        availablePosts[j]!,
        availablePosts[i]!,
      ];
    }

    // 3. 앞에서부터 4개만 반환합니다
    return availablePosts.slice(0, 4);
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
    const originalPost = await this.getOne({ postId });

    const isTitleChanged = originalPost.title !== post.title;

    if (isTitleChanged) {
      if (post.title) {
        const { isUnique } = await this.checkUniqueTitle({ title: post.title });

        if (!isUnique) throw new ConflictException("이미 존재하는 제목입니다.");
      }
    }

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

  /** 제목 유니크값 검증 */
  async checkUniqueTitle({ title }: CheckUniqueTitleDto) {
    const exPost = await this.prismaService.post.findUnique({
      where: { title },
    });

    return { isUnique: !exPost };
  }
}
