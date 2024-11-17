import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import type { Request, Response } from "express";

import type { IRequestWithOAuthUser } from "#be/types";
import { IsLoggedIn, IsLoggedOut } from "#be/guards";
import { AuthService } from "#be/apis/v1/auth/auth.service";
import { LocalAuthGuard } from "#be/apis/v1/auth/local/local.guard";
import { KakaoAuthGuard } from "#be/apis/v1/auth/kakao/kakao.guard";
import { GoogleAuthGuard } from "#be/apis/v1/auth/google/google.guard";

@Controller("apis/v1/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ==================== local login ====================
  @UseGuards(LocalAuthGuard)
  @UseGuards(IsLoggedOut)
  @Post("login")
  @HttpCode(200)
  async logIn(@Req() req: Request, @Res() res: Response) {
    res.cookie("sd_logged_in", "로그인");

    return res.json(req.user);
  }

  // ==================== kakao login ====================
  @UseGuards(KakaoAuthGuard)
  @UseGuards(IsLoggedOut)
  @Get("login/kakao")
  async oauthKakao() {
    // `KakaoAuthGuard` 에서 로직을 처리하고 응답값을 `login/kakao/redirect`로 보냄
  }

  @UseGuards(KakaoAuthGuard)
  @Get("login/kakao/redirect")
  async oauthKakaoRedirect(
    @Req() req: IRequestWithOAuthUser,
    @Res() res: Response,
  ) {
    await this.authService.validateOAuth(req.user);

    // 카카오에서 제공해준 토큰들 ( 로그아웃 시 사용 )
    res.cookie("accessToken", req.user.accessToken);
    res.cookie("refreshToken", req.user.refreshToken);

    // 자체적으로 로그인 확인을 위한 쿠키
    res.cookie("sd_logged_in", "로그인");

    return res.redirect(process.env.CLIENT_URL + "/oauth/redirect");
  }

  // ==================== google login ====================
  @UseGuards(GoogleAuthGuard)
  @UseGuards(IsLoggedOut)
  @Get("login/google")
  async oauthGoogle() {
    // `GoogleAuthGuard` 에서 로직을 처리하고 응답값을 `login/google/redirect`로 보냄
  }

  @UseGuards(GoogleAuthGuard)
  @Get("login/google/redirect")
  async oauthGoogleRedirect(
    @Req() req: IRequestWithOAuthUser,
    @Res() res: Response,
  ) {
    await this.authService.validateOAuth(req.user);

    // 구글에서 제공해준 토큰들 ( 로그아웃 시 사용 )
    res.cookie("accessToken", req.user.accessToken);
    res.cookie("refreshToken", req.user.refreshToken);

    // 자체적으로 로그인 확인을 위한 쿠키
    res.cookie("sd_logged_in", "로그인");

    return res.redirect(process.env.CLIENT_URL + "/oauth/redirect");
  }

  @UseGuards(IsLoggedIn)
  @Post("logout")
  @HttpCode(200)
  logOut(@Req() req: Request, @Res() res: Response) {
    const { accessToken } = req.cookies;

    if (!req.user) throw new UnauthorizedException("로그인 상태가 아닙니다.");

    try {
      // 카카오 로그인인 경우 로그아웃 처리
      if (req.user.provider === "KAKAO") {
        fetch("https://kapi.kakao.com/v1/user/unlink", {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      }
      // 구글 로그인인 경우 로그아웃 처리
      if (req.user.provider === "GOOGLE") {
        fetch(`https://oauth2.googleapis.com/revoke?token=${accessToken}`, {
          method: "POST",
        });
      }
    } catch (error) {
      console.error("[Error] OAuth 로그아웃 >> ", error);
    }

    return req.logout({ keepSessionInfo: false }, () => {
      res.clearCookie("connect.sid");
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.clearCookie("sd_logged_in");
      req.session.destroy((error) => {
        console.error("[Error] req.session.destroy() >> ", error);
      });

      res.json({});
    });
  }
}
