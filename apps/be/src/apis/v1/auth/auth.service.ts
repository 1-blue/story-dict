import { Injectable } from "@nestjs/common";

import type { IOAuthUser } from "#be/types";
import { UsersService } from "#be/apis/v1/users/users.service";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  /** 로컬 로그인 검증 */
  async validateUser(email: string, password: string) {
    return await this.usersService.validate({ email, password });
  }

  /** OAuth 로그인 검증 */
  async validateOAuth(oauthUser: IOAuthUser) {
    const exOAuthUser = await this.usersService.getOneByProviderId(
      oauthUser.providerId ?? undefined,
    );

    // 이전에 로그인된적이 없다면 회원가입
    if (!exOAuthUser) {
      const { externalImageURL } = oauthUser;

      return await this.usersService.create({
        id: oauthUser.id,
        email: oauthUser.email,
        // 로그인 시 닉네임 제공에 허용했다면, 닉네임 기반으로 이름 생성 ( 아니라면 provider 기준으로 이름 생성 )
        nickname:
          (oauthUser.nickname ? oauthUser.nickname : oauthUser.provider) +
          "_" +
          Date.now(),
        password: process.env.OAUTH_PASSWORD,
        imagePath: externalImageURL,
        role: "USER",
        provider: oauthUser.provider,
        providerId: oauthUser.providerId ?? undefined,
      });
    }

    return exOAuthUser;
  }
}
