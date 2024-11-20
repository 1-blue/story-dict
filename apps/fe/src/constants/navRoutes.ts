import {
  LockOpenIcon as OLockOpenIcon,
  KeyIcon as OKeyIcon,
  HomeIcon as OHomeIcon,
  PencilSquareIcon as OPencilSquareIcon,
  CubeIcon as OCubeIcon,
  RectangleStackIcon as ORectangleStackIcon,
  CpuChipIcon as OCupChipIcon,
} from "@heroicons/react/24/outline";
import {
  LockOpenIcon as SLockOpenIcon,
  KeyIcon as SKeyIcon,
  HomeIcon as SHomeIcon,
  PencilSquareIcon as SPencilSquareIcon,
  CubeIcon as SCubeIcon,
  RectangleStackIcon as SRectangleStackIcon,
  CpuChipIcon as SCupChipIcon,
} from "@heroicons/react/24/solid";

import type { IRoute } from "#fe/types";

import { CATEGORIES, DEFAULT_SITEMAP, routes } from "#fe/constants";

export const NAV_ROUTES: Record<"main" | "auth" | "information", IRoute[]> = {
  main: [
    {
      label: "게시글",
      path: routes.post.url,
      accessLevel: routes.post.accessLevel,
      OIcon: OCupChipIcon,
      SIcon: SCupChipIcon,
      sitemap: DEFAULT_SITEMAP,
    },
    {
      label: "글쓰기",
      path: routes.post.write.url,
      accessLevel: routes.post.write.accessLevel,
      OIcon: OPencilSquareIcon,
      SIcon: SPencilSquareIcon,
      sitemap: DEFAULT_SITEMAP,
    },
    {
      label: "랜덤",
      path: routes.post.random.url,
      accessLevel: routes.post.random.accessLevel,
      OIcon: OCubeIcon,
      SIcon: SCubeIcon,
      sitemap: DEFAULT_SITEMAP,
    },
    {
      label: "카테고리",
      path: routes.post.category.url,
      accessLevel: routes.post.category.accessLevel,
      OIcon: ORectangleStackIcon,
      SIcon: SRectangleStackIcon,
      sitemap: DEFAULT_SITEMAP,
      subRoutes: CATEGORIES.map((category) => ({
        label: category.label,
        path: `/post/category/${category.value}`,
        accessLevel: "public",
        OIcon: ORectangleStackIcon,
        SIcon: SRectangleStackIcon,
      })),
    },
  ],
  auth: [
    {
      label: "로그인",
      path: routes.login.url,
      accessLevel: routes.login.accessLevel,
      OIcon: OLockOpenIcon,
      SIcon: SLockOpenIcon,
      sitemap: {
        ...DEFAULT_SITEMAP,
        priority: 0.7,
      },
    },
    {
      label: "회원가입",
      path: routes.signup.url,
      accessLevel: routes.signup.accessLevel,
      OIcon: OKeyIcon,
      SIcon: SKeyIcon,
      sitemap: {
        ...DEFAULT_SITEMAP,
        priority: 0.7,
      },
    },
  ],
  information: [
    {
      label: "오픈 카톡방",
      path: routes.openKakaoChat.url,
      accessLevel: "public",
      OIcon: OHomeIcon,
      SIcon: SHomeIcon,
    },
    {
      label: "피드백",
      path: routes.openGoogleSheetFeedback.url,
      accessLevel: "public",
      OIcon: OHomeIcon,
      SIcon: SHomeIcon,
      hidden: true,
    },
  ],
};
