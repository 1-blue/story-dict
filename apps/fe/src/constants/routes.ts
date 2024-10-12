import { CrumpledPaperIcon } from "@radix-ui/react-icons";

import { AccessLevel, RouteGroup, type IRoute, type ISitemap } from "#fe/types";

const DEFAULT_SITEMAP: ISitemap = {
  priority: 1,
  lastmod: new Date().toISOString(),
  changefreq: "daily",
};

// 경로 상수 정의
export const PATHS = {
  HOME: "/",
  RANDOM: "/random",
  CATEGORY: "/category",
  LOGIN: "/login",
  SIGNUP: "/signup",
  POST: {
    WRITE: "/post/write",
  },
  ME: {
    PROFILE: "/me/profile",
    BOOKMARK: "/me/bookmark",
  },
} as const;

/** 전체 경로 */
export const ROUTES: IRoute[] = [
  // ============================ MAIN ============================
  {
    path: PATHS.HOME,
    Icon: CrumpledPaperIcon,
    label: "홈",
    hidden: false,
    accessLevel: AccessLevel.PUBLIC,
    sitemap: DEFAULT_SITEMAP,
    group: RouteGroup.MAIN,
  },

  // ============================ CONTENT ============================
  {
    path: PATHS.RANDOM,
    Icon: CrumpledPaperIcon,
    label: "랜덤",
    hidden: false,
    accessLevel: AccessLevel.PUBLIC,
    sitemap: DEFAULT_SITEMAP,
    group: RouteGroup.CONTENT,
  },
  {
    path: PATHS.CATEGORY,
    Icon: CrumpledPaperIcon,
    label: "카테고리",
    hidden: false,
    accessLevel: AccessLevel.PUBLIC,
    sitemap: DEFAULT_SITEMAP,
    group: RouteGroup.CONTENT,
  },
  {
    path: PATHS.POST.WRITE,
    Icon: CrumpledPaperIcon,
    label: "글쓰기",
    hidden: false,
    accessLevel: AccessLevel.AUTHENTICATED,
    sitemap: DEFAULT_SITEMAP,
    group: RouteGroup.CONTENT,
  },
  {
    path: PATHS.ME.BOOKMARK,
    Icon: CrumpledPaperIcon,
    label: "북마크",
    hidden: false,
    accessLevel: AccessLevel.AUTHENTICATED,
    sitemap: DEFAULT_SITEMAP,
    group: RouteGroup.CONTENT,
  },

  // ============================ AUTH ============================
  {
    path: PATHS.LOGIN,
    Icon: CrumpledPaperIcon,
    label: "로그인",
    hidden: false,
    accessLevel: AccessLevel.UNAUTHENTICATED,
    sitemap: DEFAULT_SITEMAP,
    group: RouteGroup.AUTH,
  },
  {
    path: PATHS.SIGNUP,
    Icon: CrumpledPaperIcon,
    label: "회원가입",
    hidden: false,
    accessLevel: AccessLevel.UNAUTHENTICATED,
    sitemap: DEFAULT_SITEMAP,
    group: RouteGroup.AUTH,
  },
];
