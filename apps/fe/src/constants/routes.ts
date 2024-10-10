import { CrumpledPaperIcon } from "@radix-ui/react-icons";

import { RouteGroup, type IRoute, type ISitemap } from "#fe/types";

const DEFAULT_SITEMAP: ISitemap = {
  priority: 1,
  lastmod: new Date().toISOString(),
  changefreq: "daily",
};

/** 전체 경로 */
export const ROUTES: IRoute[] = [
  {
    path: "/",
    Icon: CrumpledPaperIcon,
    label: "메인",
    hidden: false,
    sitemap: DEFAULT_SITEMAP,
    group: RouteGroup.MAIN,
  },
  {
    path: "/random",
    Icon: CrumpledPaperIcon,
    label: "랜덤",
    hidden: false,
    sitemap: DEFAULT_SITEMAP,
    group: RouteGroup.CONTENT,
  },
  {
    path: "/category",
    Icon: CrumpledPaperIcon,
    label: "카테고리",
    hidden: false,
    sitemap: DEFAULT_SITEMAP,
    group: RouteGroup.CONTENT,
  },
  {
    path: "/bookmark",
    Icon: CrumpledPaperIcon,
    label: "북마크",
    hidden: false,
    sitemap: DEFAULT_SITEMAP,
    group: RouteGroup.CONTENT,
  },
  {
    path: "/signin",
    Icon: CrumpledPaperIcon,
    label: "로그인",
    hidden: false,
    sitemap: DEFAULT_SITEMAP,
    group: RouteGroup.AUTH,
  },
  {
    path: "/signup",
    Icon: CrumpledPaperIcon,
    label: "회원가입",
    hidden: false,
    sitemap: DEFAULT_SITEMAP,
    group: RouteGroup.AUTH,
  },
];

/** 컨텐츠 경로 */
export const CONTENT_ROUTES = ROUTES.filter(
  (route) => route.group === RouteGroup.CONTENT,
);

/** 인증 경로 */
export const AUTH_ROUTES = ROUTES.filter(
  (route) => route.group === RouteGroup.AUTH,
);
