import type { Request } from "express";
import type { User } from "@prisma/client";

/** OAuth로 로그인한 유저의 중간 타입 ( 실제 로그인 이전 `passport`를 이용해서 사용하는 타입 ) */
export interface OAuthUser
  extends Pick<
    User,
    "id" | "email" | "nickname" | "provider" | "providerId" | "role"
  > {
  accessToken: string;
  refreshToken: string;
  externalImageURL?: string;
}

/** OAuth로 로그인한 유저 데이터를 가지고 있는 `request` ( 실제 로그인 이전 `passport`를 이용해서 사용하는 타입 ) */
// 로그인전후의 Express.User 타입이 서로 맞지 않아서 타입 체크 무시
export interface RequestWithOAuthUser extends Request {
  user: OAuthUser;
}
