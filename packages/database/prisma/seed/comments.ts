import { Prisma } from "@sd/db";
import {
  SEED_ADMIN_USER_ID,
  SEED_FIRST_STORY_ID,
  toSeedUuid,
} from "./seed-ids";

/** 기본 댓글들  */
export const seedComments: Prisma.StoryCommentCreateManyInput[] = Array.from({
  length: 10,
}).map((_, index) => ({
  id: toSeedUuid("00000001", index.toString().padStart(12, "0")),
  content: `기본 댓글 ${index}`,
  userId: SEED_ADMIN_USER_ID,
  storyId: SEED_FIRST_STORY_ID,
}));
