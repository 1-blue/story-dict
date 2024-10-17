import type { PostCategory, ReactionType } from "#be/types";

/** 게시글 카테고리와 한글을 맵핑 */
export const postCategoryToKoreanMap: Record<PostCategory, string> = {
  GENERAL_KNOWLEDGE: "상식",
  ETYMOLOGY: "어원",
  PURE_KOREAN: "순우리말",
  QUOTATION: "명대사",
  INFORMATION: "단순 정보",
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
