import { Prisma } from "@prisma/client";

/** 일반 상식 mock 게시글들 */
export const generalKnowledgePosts: Pick<
  Prisma.PostCreateInput,
  "title" | "summary" | "content" | "category"
>[] = [
  {
    title: `카르만 라인`,
    summary: `지구의 대기권과 우주를 구분하는 경계`,
    content: `지상에서 100km 높이까지를 대기권이라고 부르는데, 이 경계선을 카르만 라인이라고 부릅니다.`,
  },
  {
    title: `귤락`,
    summary: `귤의 알맹이에 붙어있는 하얀 실`,
    content: `귤의 알맹이에 붙어있는 하얀 실을 귤락이라고 부릅니다.`,
  },
].map((post) => ({ ...post, category: `GENERAL_KNOWLEDGE` }));
