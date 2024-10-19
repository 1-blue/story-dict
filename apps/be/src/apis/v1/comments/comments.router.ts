import { Injectable } from "@nestjs/common";
import { z } from "zod";

import { TrpcService } from "#be/apis/v0/trpc/trpc.service";
import { CommentsService } from "#be/apis/v1/comments/comments.service";
import { schemas } from "@xstory/utils";

@Injectable()
export class CommentsRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly commentsService: CommentsService,
  ) {}
  router = this.trpc.router({
    /** 게시글 생성 */
    create: this.trpc.procedure
      .input(
        z.object({
          id: z.string().optional(),
          content: schemas.content,
          postId: z.string(),
          userId: z.string(),
        }),
      )
      .mutation(async ({ input }) => await this.commentsService.create(input)),
    /** 댓글들 조회 */
    getMany: this.trpc.procedure
      .input(
        z.object({
          postId: z.string(),
        }),
      )
      .query(
        async ({ input }) =>
          await this.commentsService.findMany({ id: input.postId }),
      ),
    /** 댓글 수정 */
    updateOne: this.trpc.procedure
      .input(
        z.object({
          id: z.string(),
          content: schemas.content,
        }),
      )
      .mutation(
        async ({ input: { id, ...rest } }) =>
          await this.commentsService.update({ id }, rest),
      ),
    /** 댓글 삭제 */
    deleteOne: this.trpc.procedure
      .input(
        z.object({
          id: z.string(),
        }),
      )
      .mutation(async ({ input }) => await this.commentsService.delete(input)),
  });
}
