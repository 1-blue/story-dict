import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { PingModule } from "#be/apis/v0/ping/pings.module";
import { AuthModule } from "#be/apis/v1/auth/auth.module";
import { ImagesModule } from "#be/apis/v1/images/images.module";
import { UsersModule } from "#be/apis/v1/users/users.module";
import { PostsModule } from "#be/apis/v1/posts/posts.module";
import { PostsReactionsModule } from "#be/apis/v1/posts/reactions/reactions.module";
import { PostsCommentsModule } from "#be/apis/v1/posts/comments/comments.module";
import { PostsCommentsReactionsModule } from "#be/apis/v1/posts/comments/reactions/reactions.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    PingModule,
    AuthModule,
    ImagesModule,
    UsersModule,
    PostsModule,
    PostsReactionsModule,
    PostsCommentsModule,
    PostsCommentsReactionsModule,
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
