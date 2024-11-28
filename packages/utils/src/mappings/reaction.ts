type TReactionType =
  | "GOOD"
  | "BAD"
  | "FIRE"
  | "SEE"
  | "HEART"
  | "SMILE"
  | "SAD"
  | "ANGRY"
  | "WOW"
  | "QUESTION";

/** 리액션 타입과 이모지를 맵핑 */
export const reactionTypeToEmojiMap: Record<TReactionType, string> = {
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
