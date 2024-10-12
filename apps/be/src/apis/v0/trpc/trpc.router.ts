import { INestApplication, Injectable } from "@nestjs/common";
import * as trpcExpress from "@trpc/server/adapters/express";

import { TrpcService } from "#be/apis/v0/trpc/trpc.service";
import { CatsRouter } from "#be/apis/v1/cats/cats.router";
import { UsersRouter } from "#be/apis/v1/users/users.router";
import { PostsRouter } from "#be/apis/v1/posts/posts.router";

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly catsRouter: CatsRouter,
    private readonly usersRouter: UsersRouter,
    private readonly postsRouter: PostsRouter,
  ) {}
  appRouter = this.trpcService.router({
    cats: this.catsRouter.router,
    users: this.usersRouter.router,
    posts: this.postsRouter.router,
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/api/v0/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
        createContext: () => ({}),
      }),
    );
  }
}

export type AppRouter = TrpcRouter[`appRouter`];
