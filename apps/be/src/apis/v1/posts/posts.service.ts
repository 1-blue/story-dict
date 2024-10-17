import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { FindByIdDto } from "#be/dtos/find-by-id.dto";
import { CreatePostDto } from "#be/apis/v1/posts/dtos/create-post.dto";
import { UpdatePostDto } from "#be/apis/v1/posts/dtos/update-post.dto";

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  /** 게시글 생성 */
  async create({ ...post }: CreatePostDto) {
    return await this.prismaService.post.create({
      data: {
        ...post,
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
