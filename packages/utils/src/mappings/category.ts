type TPostCategory =
  | "GENERAL_KNOWLEDGE"
  | "ETYMOLOGY"
  | "PURE_KOREAN"
  | "QUOTATION"
  | "INFORMATION"
  | "NONSENSE";

/** 게시글 카테고리와 한글을 맵핑 */
export const postCategoryToKoreanMap: Record<TPostCategory, string> = {
  GENERAL_KNOWLEDGE: "상식",
  ETYMOLOGY: "어원",
  PURE_KOREAN: "순우리말",
  QUOTATION: "명대사",
  INFORMATION: "단순 정보",
  NONSENSE: "넌센스",
};
