import { AccessibilityIcon } from "@radix-ui/react-icons";

import type { ISitemap } from ".";

export enum RouteGroup {
  MAIN = 1,
  CONTENT = 2,
  AUTH = 3,
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
  /** 하위 경로 */
  subRoutes?: IRoute[];
  /** 사이트맵 설정 */
  sitemap?: ISitemap;
  /** 그룹 */
  group?: RouteGroup;
}
