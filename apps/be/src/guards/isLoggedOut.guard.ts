import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import type { Request } from "express";

/** 로그아웃 했는지를 판단하는 가드 */
@Injectable()
export class IsLoggedOut implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();

    if (!req.isUnauthenticated()) {
      throw new ForbiddenException("로그아웃후에 접근해주세요.");
    }

    return true;
  }
}
