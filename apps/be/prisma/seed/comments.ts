import { Prisma } from "@prisma/client";

/** 기본 댓글들  */
export const seedComments: Prisma.CommentCreateManyInput[] = Array.from({
  length: 10,
}).map((_, index) => ({
  id: `00000000-0000-0000-0000-${index}00000000000`.slice(0, 36),
  content: `기본 댓글 ${index}`,
  userId: `00000000-0000-0000-0000-000000000000`,
  postId: `00000000-0000-0000-0000-000000000000`,
}));
