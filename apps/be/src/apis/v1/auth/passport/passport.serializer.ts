import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import type { User } from "@sd/db";

import { UsersService } from "#be/apis/v1/users/users.service";

@Injectable()
export class MyPassportSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  /** [최초 로그인 시 실행] 세션에 저장해둘 값 지정 */
  serializeUser(user: User, done: CallableFunction) {
    // OAuth 로그인이라면
    if (user.providerId) {
      this.usersService
        .findOneByProviderId(user.providerId)
        // (oauth에서) 로그인했던 이력이 있다면 기존 아이디를 사용하고, 아니라면 생성할 아이디 사용
        .then((exUser) => done(null, exUser ? exUser.id : user.id))
        .catch((error) => done(error));
    }

    // 로컬 로그인이라면
    if (user.provider === "LOCAL") {
      this.usersService
        .findOne({ userId: user.id })
        .then((exUser) => done(null, exUser.id))
        .catch((error) => done(error));
    }
  }

  /** [로그인 세션 쿠키가 들어온 경우 실행] `serializeUser()`에서 저장한 값을 받아서 전체 정보 탐색 ( `req.user`로 들어감 ) */
  deserializeUser(userId: string, done: CallableFunction) {
    this.usersService
      .findUserBasicInfo({ userId })
      .then((exUser) => done(null, exUser))
      .catch((error) => done(error));
  }
}
