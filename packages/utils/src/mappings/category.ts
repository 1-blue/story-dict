import type { PostCategory } from "@sd/db";

/** 게시글 카테고리를 한글로 맵핑 */
export const postCategoryToKoreanMap: Record<PostCategory, string> = {
  GENERAL_KNOWLEDGE: "상식",
  ETYMOLOGY: "어원",
  PURE_KOREAN: "순우리말",
  QUOTATION: "명대사",
  INFORMATION: "단순 정보",
  NONSENSE: "넌센스",
};
