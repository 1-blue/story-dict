import { INestApplication, Injectable } from "@nestjs/common";
import * as trpcExpress from "@trpc/server/adapters/express";

import { TrpcService } from "#be/apis/v0/trpc/trpc.service";
import { CatsRouter } from "#be/apis/v1/cats/cats.router";

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly catsRouter: CatsRouter,
  ) {}
  appRouter = this.trpcService.router({
    cats: this.catsRouter.router,
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/api/v0/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
      }),
    );
  }
}

export type AppRouter = TrpcRouter[`appRouter`];
