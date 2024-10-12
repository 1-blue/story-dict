import { v4 as uuidv4 } from "uuid";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-kakao";

import type { OAuthUser } from "#be/types";

export class KakaoStrategy extends PassportStrategy(Strategy, "kakao") {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
      scope: ["account_email", "profile_nickname", "profile_image"],
    });
  }

  /** 응답값이 `serializeUser()`로 들어감 */
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const oauthUser: OAuthUser = {
      id: uuidv4(),
      email: profile._json.kakao_account.email,
      provider: "KAKAO",
      providerId: String(profile.id),
      accessToken,
      refreshToken,
      ...(profile._json.properties.nickname && {
        nickname: profile._json.properties.nickname,
      }),
      ...(profile._json.properties.profile_image && {
        externalImageURL: profile._json.properties.profile_image,
      }),
    };

    return oauthUser;
  }
}
