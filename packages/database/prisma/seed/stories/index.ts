import { Prisma } from "@sd/db";
import { SEED_ADMIN_USER_ID, toSeedUuid } from "../seed-ids";
import { etymologyStories } from "./etymology";
import { generalKnowledgeStories } from "./generalKnowledge";
import { informationStories } from "./information";
import { nonsenseStories } from "./nonsense";
import { pureKoreanStories } from "./pureKorean";

const datas: Pick<
  Prisma.StoryCreateInput,
  "title" | "summary" | "content" | "category"
>[][] = [
  etymologyStories,
  generalKnowledgeStories,
  informationStories,
  nonsenseStories,
  pureKoreanStories,
];

/** 기본 게시물들 */
export const seedStories: Prisma.StoryCreateManyInput[] = datas.flatMap(
  (data, index) =>
    data.map((story, i) => {
      const frontId = index.toString().padStart(8, "0");
      const backId = i.toString().padStart(12, "0");

      return {
        ...story,
        id: toSeedUuid(frontId, backId),
        userId: SEED_ADMIN_USER_ID,
      };
    })
);
