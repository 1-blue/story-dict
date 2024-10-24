import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { AuthModule } from "#be/apis/v1/auth/auth.module";
import { ImagesModule } from "#be/apis/v1/images/images.module";
import { UsersModule } from "#be/apis/v1/users/users.module";
import { PostsModule } from "#be/apis/v1/posts/posts.module";
import { ReactionsModule } from "#be/apis/v1/reactions/reactions.module";
import { CommentsModule } from "#be/apis/v1/comments/comments.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    AuthModule,
    ImagesModule,
    UsersModule,
    PostsModule,
    ReactionsModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
