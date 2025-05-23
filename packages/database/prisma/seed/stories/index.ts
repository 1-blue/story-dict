import { Prisma } from "@sd/db";
import { etymologyStories } from "./etymology";
import { generalKnowledgeStories } from "./generalKnowledge";
import { informationStories } from "./information";
import { nonsenseStories } from "./nonsense";
import { pureKoreanStories } from "./pureKorean";

const datas: Pick<
  Prisma.StoryCreateInput,
  "title" | "summary" | "content" | "category"
>[] = [
  ...etymologyStories,
  ...generalKnowledgeStories,
  ...informationStories,
  ...nonsenseStories,
  ...pureKoreanStories,
];

/** 기본 게시물들 */
export const seedStories: Prisma.StoryCreateManyInput[] = datas.map(
  (data, index) => ({
    ...data,
    id: `00000000-0000-0000-0000-${index}00000000000`.slice(0, 36),
    userId: `00000000-0000-0000-0000-000000000000`,
  })
);
