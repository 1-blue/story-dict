import type { UserProvider, UserRole } from "@prisma/client";

/** 대소문자 합쳐진 유저 역할들 ( `dto`에서 유효성 검사에서 대소문자 모두 허용하기 위해 사용 ) */
export const USER_ROLES: (UserRole | Lowercase<UserRole>)[] = [
  "ADMIN",
  "admin",
  "MANAGER",
  "manager",
  "USER",
  "user",
  "GUEST",
  "guest",
];

/** 대소문자 합쳐진 유저 제공자들 ( `dto`에서 유효성 검사에서 대소문자 모두 허용하기 위해 사용 ) */
export const USER_PROVIDERS: (UserProvider | Lowercase<UserProvider>)[] = [
  "LOCAL",
  "local",
  "KAKAO",
  "kakao",
  "GOOGLE",
  "google",
];
