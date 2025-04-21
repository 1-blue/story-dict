import type { IRoute } from "#fe/types";

import { CATEGORIES, DEFAULT_SITEMAP, routes } from "#fe/constants";

export const NAV_ROUTES: Record<"main" | "auth" | "information", IRoute[]> = {
  main: [
    {
      ...routes.story,
      label: "게시글",
      sitemap: DEFAULT_SITEMAP,
    },
    {
      ...routes.story.write,
      label: "글쓰기",
      sitemap: DEFAULT_SITEMAP,
    },
    {
      ...routes.story.random,
      label: "랜덤",
      sitemap: DEFAULT_SITEMAP,
    },
    {
      label: "카테고리",
      ...routes.story.category,
      sitemap: DEFAULT_SITEMAP,
      subRoutes: CATEGORIES.map((category) => ({
        ...routes.story.category.detail,
        label: category.label,
        url: `/stories/category/${category.value}`,
      })),
    },
  ],
  auth: [
    {
      ...routes.login,
      label: "로그인",
      sitemap: {
        ...DEFAULT_SITEMAP,
        priority: 0.7,
      },
    },
    {
      ...routes.signup,
      label: "회원가입",
      sitemap: {
        ...DEFAULT_SITEMAP,
        priority: 0.7,
      },
    },
  ],
  information: [
    {
      ...routes.openKakaoChat,
      label: "오픈 카톡방",
    },
    {
      ...routes.openGoogleSheetFeedback,
      label: "피드백",
    },
  ],
};
