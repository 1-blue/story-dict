import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { PingModule } from "#be/apis/v0/ping/pings.module";
import { AuthModule } from "#be/apis/v1/auth/auth.module";
import { ImagesModule } from "#be/apis/v1/images/images.module";
import { UsersModule } from "#be/apis/v1/users/users.module";
import { StoriesModule } from "#be/apis/v1/stories/stories.module";
import { StoriesReactionsModule } from "#be/apis/v1/stories/reactions/reactions.module";
import { StoriesCommentsModule } from "#be/apis/v1/stories/comments/comments.module";
import { StoriesCommentsReactionsModule } from "#be/apis/v1/stories/comments/reactions/reactions.module";

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
    StoriesModule,
    StoriesReactionsModule,
    StoriesCommentsModule,
    StoriesCommentsReactionsModule,
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
