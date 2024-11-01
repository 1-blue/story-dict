import {
  LockOpenIcon as OLockOpenIcon,
  KeyIcon as OKeyIcon,
  HomeIcon as OHomeIcon,
  PencilSquareIcon as OPencilSquareIcon,
  CubeIcon as OCubeIcon,
  RectangleStackIcon as ORectangleStackIcon,
} from "@heroicons/react/24/outline";
import {
  LockOpenIcon as SLockOpenIcon,
  KeyIcon as SKeyIcon,
  HomeIcon as SHomeIcon,
  PencilSquareIcon as SPencilSquareIcon,
  CubeIcon as SCubeIcon,
  RectangleStackIcon as SRectangleStackIcon,
} from "@heroicons/react/24/solid";
import { IRoute } from "#fe/types";
import { DEFAULT_SITEMAP } from "./sitemap";

export const ROUTES: Record<"post" | "auth" | "information", IRoute[]> = {
  post: [
    {
      label: "게시글",
      path: "/post",
      accessLevel: "public",
      OIcon: OHomeIcon,
      SIcon: SHomeIcon,
      sitemap: DEFAULT_SITEMAP,
      subRoutes: [
        {
          label: "글쓰기",
          path: "/post/write",
          accessLevel: "authenticated",
          OIcon: OPencilSquareIcon,
          SIcon: SPencilSquareIcon,
          sitemap: DEFAULT_SITEMAP,
        },
        {
          label: "랜덤",
          path: "/post/random",
          accessLevel: "public",
          OIcon: OCubeIcon,
          SIcon: SCubeIcon,
          sitemap: DEFAULT_SITEMAP,
        },
        {
          label: "카테고리",
          path: "/post/category",
          accessLevel: "public",
          OIcon: ORectangleStackIcon,
          SIcon: SRectangleStackIcon,
          sitemap: DEFAULT_SITEMAP,
        },
      ],
    },
  ],
  auth: [
    {
      label: "로그인",
      path: "/login",
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
      path: "/signup",
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
      path: "https://open.kakao.com/o/gGD8z8Vg",
      OIcon: OHomeIcon,
      SIcon: SHomeIcon,
      accessLevel: "public",
    },
    {
      label: "피드백",
      path: "/FIXME:구글설문조사+구글시트",
      OIcon: OHomeIcon,
      SIcon: SHomeIcon,
      accessLevel: "public",
      hidden: true,
    },
  ],
};
