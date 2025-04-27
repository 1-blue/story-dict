/**
 * + 페이지 변경 빈도
 *   1. `always`: 접근할 때마다 변경
 *   1. `hourly`: 시간마다 변경
 *   1. `daily`: 일마다 변경
 *   1. `weekly`: 주마다 변경
 *   1. `monthly`: 월마다 변경
 *   1. `yearly`: 년마다 변경
 *   1. `never`: 보관용
 */
export type TChamgefreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

/** 사이트맵 */
export interface ISitemap {
  /** 이야기 마지막 수정일 ( `YYYY-MM-DD` ) */
  lastmod: string;
  /** 페이지 변경 빈도 */
  changefreq: TChamgefreq;
  /** 우선순위 0.0 ~ 1.0 */
  priority: number;
}
