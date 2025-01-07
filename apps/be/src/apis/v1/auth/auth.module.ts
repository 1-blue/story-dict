import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { AuthController } from "#be/apis/v1/auth/auth.controller";
import { AuthService } from "#be/apis/v1/auth/auth.service";
import { UsersService } from "#be/apis/v1/users/users.service";
import { MyPassportSerializer } from "#be/apis/v1/auth/passport/passport.serializer";
import { LocalStrategy } from "#be/apis/v1/auth/local/local.strategy";
import { KakaoStrategy } from "#be/apis/v1/auth/kakao/kakao.strategy";
import { GoogleStrategy } from "#be/apis/v1/auth/google/google.strategy";

@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UsersService,
    MyPassportSerializer,
    LocalStrategy,
    KakaoStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}
