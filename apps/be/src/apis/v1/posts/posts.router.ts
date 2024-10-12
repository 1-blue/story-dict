import { Injectable } from "@nestjs/common";
import { z } from "zod";
import { PostCategory } from "@prisma/client";

import { TrpcService } from "#be/apis/v0/trpc/trpc.service";
import { PostsService } from "#be/apis/v1/posts/posts.service";
import { schemas } from "@xstory/utils";

@Injectable()
export class PostsRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly postsService: PostsService,
  ) {}
  router = this.trpc.router({
    /** 게시글 생성 */
    create: this.trpc.procedure
      .input(
        z.object({
          id: z.string().optional(),
          title: schemas.title,
          content: schemas.content,
          category: z.nativeEnum(PostCategory).optional(),
          thumbnailId: z.string().optional(),
          userId: z.string(),
        }),
      )
      .mutation(async ({ input }) => await this.postsService.create(input)),
    /** 단일 게시글 가져오기 */
    getOne: this.trpc.procedure
      .input(
        z.object({
          id: z.string(),
        }),
      )
      .query(async ({ input }) => await this.postsService.findOne(input)),
    /** 모든 게시글 가져오기 */
    getAll: this.trpc.procedure.query(
      async () => await this.postsService.findAll(),
    ),
    /** 단일 게시글 수정하기 */
    updateOne: this.trpc.procedure
      .input(
        z.object({
          id: z.string(),
          title: schemas.title.optional(),
          content: schemas.content.optional(),
          category: z.nativeEnum(PostCategory).optional(),
          thumbnailId: z.string().optional(),
        }),
      )
      .query(
        async ({ input }) =>
          await this.postsService.update({ id: input.id }, input),
      ),
    /** 단일 게시글 삭제하기 */
    deleteOne: this.trpc.procedure
      .input(
        z.object({
          id: z.string(),
        }),
      )
      .query(
        async ({ input }) => await this.postsService.delete({ id: input.id }),
      ),
  });
}
