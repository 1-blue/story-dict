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

import { DEFAULT_SITEMAP, routes } from "#fe/constants";
import { CATEGORIES } from "#fe/constants/category";

export const NAV_ROUTES: Record<"main" | "auth" | "information", IRoute[]> = {
  main: [
    {
      label: "게시글",
      path: routes.post.url,
      accessLevel: "public",
      OIcon: OCupChipIcon,
      SIcon: SCupChipIcon,
      sitemap: DEFAULT_SITEMAP,
    },
    {
      label: "글쓰기",
      path: routes.post.write.url,
      accessLevel: "authenticated",
      OIcon: OPencilSquareIcon,
      SIcon: SPencilSquareIcon,
      sitemap: DEFAULT_SITEMAP,
    },
    {
      label: "랜덤",
      path: routes.post.random.url,
      accessLevel: "public",
      OIcon: OCubeIcon,
      SIcon: SCubeIcon,
      sitemap: DEFAULT_SITEMAP,
    },
    {
      label: "카테고리",
      path: routes.post.category.url,
      accessLevel: "public",
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
      OIcon: OLockOpenIcon,
      SIcon: SLockOpenIcon,
      accessLevel: "unauthenticated",
      sitemap: {
        ...DEFAULT_SITEMAP,
        priority: 0.7,
      },
    },
    {
      label: "회원가입",
      path: routes.signup.url,
      OIcon: OKeyIcon,
      SIcon: SKeyIcon,
      accessLevel: "unauthenticated",
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
      OIcon: OHomeIcon,
      SIcon: SHomeIcon,
      accessLevel: "public",
    },
    {
      label: "피드백",
      path: routes.openGoogleSheetFeedback.url,
      OIcon: OHomeIcon,
      SIcon: SHomeIcon,
      accessLevel: "public",
      hidden: true,
    },
  ],
};
