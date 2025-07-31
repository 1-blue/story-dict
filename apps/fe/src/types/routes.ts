import { HomeIcon } from "@heroicons/react/24/outline";
import type { ISitemap } from ".";

/** 경로에 대한 타입 */
export interface IRoute {
  /** 경로를 표현할 텍스트 */
  label: string;
  /** 실제 경로 */
  url: string;
  /** (`outline`) 경로 아이콘 */
  OIcon: typeof HomeIcon;
  /** (`solid`) 경로 아이콘 */
  SIcon: typeof HomeIcon;
  /** 숨길지 여부 */
  hidden?: boolean;
  /** 접근 권한 */
  accessLevel: "public" | "authenticated" | "unauthenticated";
  /** 하위 경로 */
  subRoutes?: IRoute[];
  /** 사이트맵 설정 */
  sitemap?: ISitemap;
  /** 특정 패턴과 매칭될 때 active 상태가 되는 정규식 패턴들 */
  activeWhenMatching?: RegExp[];
}
