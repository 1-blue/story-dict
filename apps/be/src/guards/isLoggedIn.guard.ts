import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import type { Request } from "express";

/** 로그인 했는지를 판단하는 가드 */
@Injectable()
export class IsLoggedIn implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();

    if (!req.isAuthenticated()) {
      throw new ForbiddenException("로그인후에 접근해주세요.");
    }

    return true;
  }
}
