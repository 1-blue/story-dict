import { Prisma, ReactionType } from "@sd/db";

const reactionTypes: ReactionType[] = [
  "ANGRY",
  "BAD",
  "FIRE",
  "GOOD",
  "HEART",
  "QUESTION",
  "SAD",
  "SEE",
  "SMILE",
  "WOW",
];

/** 기본 게시물 리액션들  */
export const postReactions: Prisma.PostReactionCreateManyInput[] =
  reactionTypes.map((type, index) => ({
    id: `00000000-0000-0000-0000-${index}00000000000`.slice(0, 36),
    type,
    userId: `00000000-0000-0000-0000-${index}00000000000`.slice(0, 36),
    postId: `00000000-0000-0000-0000-000000000000`,
  }));
