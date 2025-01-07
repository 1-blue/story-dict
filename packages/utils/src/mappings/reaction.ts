import type { ReactionType } from "@sd/db";

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
