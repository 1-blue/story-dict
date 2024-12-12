import { Prisma } from "@sd/db";
import { etymologyPosts } from "./etymology";
import { generalKnowledgePosts } from "./generalKnowledge";
import { informationPosts } from "./information";
import { nonsensePosts } from "./nonsense";
import { pureKoreanPosts } from "./pureKorean";

const datas: Pick<
  Prisma.PostCreateInput,
  "title" | "summary" | "content" | "category"
>[] = [
  ...etymologyPosts,
  ...generalKnowledgePosts,
  ...informationPosts,
  ...nonsensePosts,
  ...pureKoreanPosts,
];

/** 기본 게시물들 */
export const seedPosts: Prisma.PostCreateManyInput[] = datas.map(
  (data, index) => ({
    ...data,
    id: `00000000-0000-0000-0000-${index}00000000000`.slice(0, 36),
    userId: `00000000-0000-0000-0000-000000000000`,
  })
);
