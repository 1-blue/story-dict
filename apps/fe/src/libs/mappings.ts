import { storyCategoryToKoreanMap } from "@sd/utils";

/** 페이지 경로 한글 맵핑 */
export const breadcrumbToKoreanMap: Record<string, string> = {
  login: "로그인",
  signup: "회원가입",
  post: "게시글",
  category: "카테고리",
  random: "랜덤",
  write: "글쓰기",
  edit: "수정",
  search: "검색",
  ...storyCategoryToKoreanMap,
};
