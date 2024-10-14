import { Injectable } from "@nestjs/common";
import { z } from "zod";
import { ImagePurpose, ImageStatus } from "@prisma/client";

import { TrpcService } from "#be/apis/v0/trpc/trpc.service";
import { ImagesService } from "#be/apis/v1/images/images.service";

@Injectable()
export class ImagesRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly imagesService: ImagesService,
  ) {}
  router = this.trpc.router({
    /** S3 이미지 업로드 전용 `presignedURL` 생성 */
    createPresignedURL: this.trpc.procedure
      .input(
        z.object({
          filename: z.string(),
          status: z.nativeEnum(ImageStatus).optional(),
        }),
      )
      .mutation(
        async ({ input }) => await this.imagesService.createPresignedURL(input),
      ),
    create: this.trpc.procedure
      .input(
        z.object({
          id: z.string().uuid().optional(),
          name: z.string(),
          url: z.string().url(),
          status: z.nativeEnum(ImageStatus).optional(),
          purpose: z.nativeEnum(ImagePurpose).optional(),
        }),
      )
      .mutation(async ({ input }) => await this.imagesService.create(input)),
    move: this.trpc.procedure
      .input(
        z.object({
          id: z.string(),
          beforeStatus: z.nativeEnum(ImageStatus),
          afterStatus: z.nativeEnum(ImageStatus),
        }),
      )
      .mutation(
        async ({ input: { id, beforeStatus, afterStatus } }) =>
          await this.imagesService.move({ id }, { beforeStatus, afterStatus }),
      ),
  });
}
