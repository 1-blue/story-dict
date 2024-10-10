import { Module } from "@nestjs/common";
// import { ConfigModule } from "@nestjs/config";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { TrpcModule } from "#be/apis/v0/trpc/trpc.module";

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: `.env.${process.env.NODE_ENV}`,
    // }),
    TrpcModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
