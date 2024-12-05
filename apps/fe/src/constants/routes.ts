import type { PostCategory } from "#be/types";
import {
  LockOpenIcon as OLockOpenIcon,
  KeyIcon as OKeyIcon,
  HomeIcon as OHomeIcon,
  PencilSquareIcon as OPencilSquareIcon,
  CubeIcon as OCubeIcon,
  RectangleStackIcon as ORectangleStackIcon,
  CpuChipIcon as OCupChipIcon,
  CommandLineIcon as OCommandLineIcon,
  BookOpenIcon as OBookOpenIcon,
  TagIcon as OTagIcon,
  MagnifyingGlassIcon as OMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  LockOpenIcon as SLockOpenIcon,
  KeyIcon as SKeyIcon,
  HomeIcon as SHomeIcon,
  PencilSquareIcon as SPencilSquareIcon,
  CubeIcon as SCubeIcon,
  RectangleStackIcon as SRectangleStackIcon,
  CpuChipIcon as SCupChipIcon,
  CommandLineIcon as SCommandLineIcon,
  BookOpenIcon as SBookOpenIcon,
  TagIcon as STagIcon,
  MagnifyingGlassIcon as SMagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

export const routes = {
  home: {
    url: "/",
    accessLevel: "public",
    OIcon: OCommandLineIcon,
    SIcon: SCommandLineIcon,
  },
  login: {
    url: "/login",
    accessLevel: "unauthenticated",
    OIcon: OLockOpenIcon,
    SIcon: SLockOpenIcon,
  },
  signup: {
    url: "/signup",
    accessLevel: "unauthenticated",
    OIcon: OKeyIcon,
    SIcon: SKeyIcon,
  },
  post: {
    url: "/post",
    accessLevel: "public",
    OIcon: OHomeIcon,
    SIcon: SHomeIcon,
    detail: {
      url: (title: string) => `/post/${title}`,
      accessLevel: "public",
      OIcon: OCupChipIcon,
      SIcon: SCupChipIcon,
    },
    write: {
      url: "/post/write",
      accessLevel: "authenticated",
      OIcon: OBookOpenIcon,
      SIcon: SBookOpenIcon,
    },
    edit: {
      url: (title: string) => `/post/edit/${title}`,
      accessLevel: "authenticated",
      OIcon: OPencilSquareIcon,
      SIcon: SPencilSquareIcon,
    },
    random: {
      url: "/post/random",
      accessLevel: "public",
      OIcon: OCubeIcon,
      SIcon: SCubeIcon,
    },
    category: {
      url: "/post/category",
      accessLevel: "public",
      OIcon: ORectangleStackIcon,
      SIcon: SRectangleStackIcon,
      detail: {
        url: (category: PostCategory) => `/post/category/${category}`,
        accessLevel: "public",
        OIcon: OTagIcon,
        SIcon: STagIcon,
      },
    },
    search: {
      detail: {
        url: (keyword: string) => `/post/search/${keyword}`,
        accessLevel: "public",
        OIcon: OMagnifyingGlassIcon,
        SIcon: SMagnifyingGlassIcon,
      },
    },
  },

  openKakaoChat: {
    url: "https://open.kakao.com/o/gGD8z8Vg",
    accessLevel: "public",
    OIcon: OHomeIcon,
    SIcon: SHomeIcon,
  },
  openGoogleSheetFeedback: {
    url: "/FIXME:구글설문조사+구글시트",
    accessLevel: "public",
    OIcon: OHomeIcon,
    SIcon: SHomeIcon,
  },
  github: {
    url: "https://github.com/1-blue",
    accessLevel: "public",
    OIcon: OHomeIcon,
    SIcon: SHomeIcon,
  },
  email: {
    url: "mailto:developer98.ninja@gmail.com",
    accessLevel: "public",
    OIcon: OHomeIcon,
    SIcon: SHomeIcon,
  },
} as const;
