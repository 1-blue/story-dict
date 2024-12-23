import { Injectable } from "@nestjs/common";

import type { IOAuthUser } from "#be/types";
import { UsersService } from "#be/apis/v1/users/users.service";
import { ImagesService } from "#be/apis/v1/images/images.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly imagesService: ImagesService,
  ) {}

  /** 로컬 로그인 검증 */
  async validateUser(email: string, password: string) {
    return await this.usersService.validate({ email, password });
  }

  /** OAuth 로그인 검증 */
  async validateOAuth(oauthUser: IOAuthUser) {
    const exOAuthUser = await this.usersService.findOneByProviderId(
      oauthUser.providerId ?? undefined,
    );

    // 이전에 로그인된적이 없다면 회원가입
    if (!exOAuthUser) {
      const { externalImageURL } = oauthUser;

      /** 외부 이미지를 등록하는 경우 해당 이미지의 식별자 */
      let imageId: string | undefined;

      // OAuth의 이미지를 제공받았다면
      if (externalImageURL) {
        const originalName = externalImageURL.slice(
          externalImageURL.lastIndexOf("/") + 1,
        );
        // 이미지 등록
        const createdImage = await this.imagesService.create({
          url: externalImageURL,
          name: originalName,
          status: "EXTERNAL",
          purpose: "USER_PROFILE",
        });
        imageId = createdImage.id;
      }

      return await this.usersService.create({
        id: oauthUser.id,
        email: oauthUser.email,
        // 로그인 시 닉네임 제공에 허용했다면, 닉네임 기반으로 이름 생성 ( 아니라면 provider 기준으로 이름 생성 )
        nickname:
          (oauthUser.nickname ? oauthUser.nickname : oauthUser.provider) +
          "_" +
          Date.now(),
        password: process.env.OAUTH_PASSWORD,
        provider: oauthUser.provider,
        providerId: oauthUser.providerId ?? undefined,
        role: "USER",
        imageId,
      });
    }

    return exOAuthUser;
  }
}
