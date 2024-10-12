import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { TrpcModule } from "#be/apis/v0/trpc/trpc.module";
import { AuthModule } from "#be/apis/v1/auth/auth.module";
import { ImagesModule } from "#be/apis/v1/images/images.module";
import { UsersModule } from "#be/apis/v1/users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TrpcModule,
    AuthModule,
    ImagesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
