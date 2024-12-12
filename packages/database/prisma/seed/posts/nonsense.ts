import { Prisma } from "@sd/db";

/** 넌센스 mock 게시글들 */
export const nonsensePosts: Pick<
  Prisma.PostCreateInput,
  "title" | "summary" | "content" | "category"
>[] = [];
