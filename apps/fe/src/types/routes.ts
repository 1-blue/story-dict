import { AccessibilityIcon } from "@radix-ui/react-icons";

import type { ISitemap } from ".";

/**
 * 1. `MAIN` : 메인 페이지
 * 2. `CONTENT` : 컨텐츠 페이지
 * 3. `AUTH` : 유저관련 페이지
 */
export enum RouteGroup {
  MAIN = "MAIN",
  CONTENT = "CONTENT",
  AUTH = "AUTH",
}
/**
 * 1. `PUBLIC` : 누구나 접근 가능
 * 2. `AUTHENTICATED` : 로그인해야 접근 가능
 * 3. `UNAUTHENTICATED` : 로그아웃시에만 접근 가능
 */
export enum AccessLevel {
  PUBLIC = "PUBLIC",
  AUTHENTICATED = "AUTHENTICATED",
  UNAUTHENTICATED = "UNAUTHENTICATED",
}

/** 경로에 대한 타입 */
export interface IRoute {
  /** 실제 경로 */
  path: `/${string}`;
  /** 경로를 표현할 텍스트 */
  label: string;
  /** 경로 아이콘 */
  Icon: typeof AccessibilityIcon;
  /** 숨길지 여부 */
  hidden: boolean;
  /** 접근 권한 */
  accessLevel: AccessLevel;
  /** 하위 경로 */
  subRoutes?: IRoute[];
  /** 사이트맵 설정 */
  sitemap?: ISitemap;
  /** 그룹 */
  group?: RouteGroup;
}
