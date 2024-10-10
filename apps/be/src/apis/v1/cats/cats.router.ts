import { Injectable } from "@nestjs/common";
import { z } from "zod";

import { TrpcService } from "#be/apis/v0/trpc/trpc.service";
import { CatsService } from "#be/apis/v1/cats/cats.service";

@Injectable()
export class CatsRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly catsService: CatsService,
  ) {}
  router = this.trpc.router({
    /** 고양이 생성 */
    create: this.trpc.procedure
      .input(
        z.object({
          id: z.string().optional(),
          name: z.string(),
          age: z.number(),
          gender: z.boolean().optional(),
        }),
      )
      .mutation(async ({ input }) => await this.catsService.create(input)),
    /** 단일 고양이 가져오기 */
    getOne: this.trpc.procedure
      .input(
        z.object({
          id: z.string(),
        }),
      )
      .query(async ({ input }) => await this.catsService.findOne(input)),
    /** 모든 고양이 가져오기 */
    getAll: this.trpc.procedure.query(
      async () => await this.catsService.findAll(),
    ),
    /** 단일 고양이 수정하기 */
    updateOne: this.trpc.procedure
      .input(
        z.object({
          id: z.string(),
          name: z.string().optional(),
          age: z.number().optional(),
          gender: z.boolean().optional(),
        }),
      )
      .query(
        async ({ input }) =>
          await this.catsService.update({ id: input.id }, input),
      ),
    /** 단일 고양이 삭제하기 */
    deleteOne: this.trpc.procedure
      .input(
        z.object({
          id: z.string(),
        }),
      )
      .query(
        async ({ input }) => await this.catsService.delete({ id: input.id }),
      ),
  });
}
