import { Injectable } from "@nestjs/common";
import { z } from "zod";
import { schemas } from "@xstory/utils";
import { TrpcService } from "#be/apis/v0/trpc/trpc.service";
import { UsersService } from "#be/apis/v1/users/users.service";

@Injectable()
export class UsersRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly usersService: UsersService,
  ) {}
  router = this.trpc.router({
    create: this.trpc.procedure
      .input(
        z.object({
          email: schemas.email,
          password: schemas.password,
          nickname: schemas.nickname,
          phone: schemas.phone.optional(),
        }),
      )
      .mutation(async ({ input }) => await this.usersService.create(input)),
  });
}
