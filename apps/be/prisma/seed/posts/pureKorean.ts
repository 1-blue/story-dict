import { Prisma } from "@prisma/client";

/** 순우리말 mock 게시글들 */
export const pureKoreanPosts: Pick<
  Prisma.PostCreateInput,
  "title" | "summary" | "content" | "category"
>[] = [
  {
    title: `윤슬`,
    summary: `햇빛이나 달빛이 비치어 반짝이는 잔물결`,
    content: `\`햇빛이나 달빛이 비치어 반짝이는 잔물결\`을 의미하는 순우리말`,
  },
  {
    title: `온새미로`,
    summary: `언제나 변함없이`,
    content: `\`가르거나 쪼개지 않고 본래의 모습 그대로\`라는 뜻의 순우리말`,
  },
].map((post) => ({ ...post, category: `PURE_KOREAN` }));
