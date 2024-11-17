import type { PostCategory, ReactionType } from "#be/types";

/** 게시글 카테고리와 한글을 맵핑 */
export const postCategoryToKoreanMap: Record<PostCategory, string> = {
  GENERAL_KNOWLEDGE: "상식",
  ETYMOLOGY: "어원",
  PURE_KOREAN: "순우리말",
  QUOTATION: "명대사",
  INFORMATION: "단순 정보",
  NONSENSE: "넌센스",
};

/** 리액션 타입과 이모지를 맵핑 */
export const reactionTypeToEmojiMap: Record<ReactionType, string> = {
  GOOD: "👍",
  BAD: "👎",
  FIRE: "🔥",
  SEE: "👀",
  HEART: "❤️",
  SMILE: "😊",
  SAD: "😢",
  ANGRY: "😠",
  WOW: "🫢",
  QUESTION: "🤔",
};

/** 페이지 경로 한글 맵핑 */
export const breadcrumbToKoreanMap: Record<string, string> = {
  login: "로그인",
  signup: "회원가입",
  post: "게시글",
  category: "카테고리",
  random: "랜덤",
  write: "글쓰기",
  search: "검색",
  ...postCategoryToKoreanMap,
};
