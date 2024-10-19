import { Injectable } from "@nestjs/common";
import { z } from "zod";
import { ReactionType } from "@prisma/client";

import { TrpcService } from "#be/apis/v0/trpc/trpc.service";
import { ReactionsService } from "#be/apis/v1/reactions/reactions.service";

@Injectable()
export class ReactionsRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly reactionsService: ReactionsService,
  ) {}
  router = this.trpc.router({
    /** 리액션 생성 */
    create: this.trpc.procedure
      .input(
        z.object({
          id: z.string().optional(),
          type: z.nativeEnum(ReactionType),
          userId: z.string(),
          postId: z.string().optional(),
          commentId: z.string().optional(),
          replyId: z.string().optional(),
        }),
      )
      .mutation(async ({ input }) => await this.reactionsService.create(input)),
    /** 리액션 수정 */
    update: this.trpc.procedure
      .input(
        z.object({
          id: z.string(),
          type: z.nativeEnum(ReactionType),
        }),
      )
      .mutation(
        async ({ input: { id, ...rest } }) =>
          await this.reactionsService.update({ id }, rest),
      ),
    /** 리액션 삭제 */
    delete: this.trpc.procedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => await this.reactionsService.delete(input)),
  });
}
