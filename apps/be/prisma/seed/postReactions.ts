import { Prisma, ReactionType } from "@prisma/client";

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
export const postReactions: Prisma.ReactionCreateManyInput[] =
  reactionTypes.map((type, index) => ({
    id: `00000000-0000-0000-0000-00000000000${index}`,
    type,
    userId: `00000000-0000-0000-0000-00000000000${index}`,
    postId: `00000000-0000-0000-0000-000000000000`,
  }));
