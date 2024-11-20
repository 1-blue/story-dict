import type { PostCategory } from "#be/types";

export const routes = {
  home: {
    url: "/",
    accessLevel: "public",
  },
  login: {
    url: "/login",
    accessLevel: "unauthenticated",
  },
  signup: {
    url: "/signup",
    accessLevel: "unauthenticated",
  },
  post: {
    url: "/post",
    accessLevel: "public",
    detail: {
      url: (title: string) => `/post/${title}`,
      accessLevel: "public",
    },
    write: {
      url: "/post/write",
      accessLevel: "authenticated",
    },
    edit: {
      url: (title: string) => `/post/edit/${title}`,
      accessLevel: "authenticated",
    },
    random: {
      url: "/post/random",
      accessLevel: "public",
    },
    category: {
      url: "/post/category",
      accessLevel: "public",
      detail: {
        url: (category: PostCategory) => `/post/category/${category}`,
        accessLevel: "public",
      },
    },
    search: {
      detail: {
        url: (keyword: string) => `/post/search/${keyword}`,
        accessLevel: "public",
      },
    },
  },

  openKakaoChat: {
    url: "https://open.kakao.com/o/gGD8z8Vg",
  },
  openGoogleSheetFeedback: {
    url: "/FIXME:구글설문조사+구글시트",
  },
  github: {
    url: "https://github.com/1-blue",
  },
  email: {
    url: "mailto:developer98.ninja@gmail.com",
  },
} as const;
