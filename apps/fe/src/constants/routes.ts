import type { PostCategory } from "#be/types";

export const routes = {
  home: {
    url: "/",
  },
  login: {
    url: "/login",
  },
  signup: {
    url: "/signup",
  },
  post: {
    url: "/post",
    detail: {
      url: (title: string) => `/post/${title}`,
    },
    write: {
      url: "/post/write",
    },
    random: {
      url: "/post/random",
    },
    category: {
      url: "/post/category",
      detail: {
        url: (category: PostCategory) => `/post/category/${category}`,
      },
    },
    search: {
      detail: {
        url: (keyword: string) => `/post/search/${keyword}`,
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
};
