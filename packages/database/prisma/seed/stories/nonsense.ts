import { Prisma } from "@sd/db";

/** 넌센스 mock 스토리들 */
export const nonsenseStories: Pick<
  Prisma.StoryCreateInput,
  "title" | "summary" | "content" | "category"
>[] = [];
