import { Prisma } from "@prisma/client";

/** 정보 mock 게시글들 */
export const informationPosts: Pick<
  Prisma.PostCreateInput,
  "title" | "summary" | "content" | "category"
>[] = [
  {
    title: `개복치`,
    summary: `사실 개복치는 매우 단단한 존재`,
    content: `개복치는 돌연사의 대명사이지만 사실 매우 단단한 생물입니다.\n하드웨어는 매우 단단하지만 소프트웨어가 약한 것일 뿐입니다.\n또한 개복치는 \`태양 물고기\`라고 불리기도 합니다.`,
  },
  {
    title: `옥수수 알갱이와 수염`,
    summary: `알갱이와 수염의 개수는 거의 동일함`,
    content: `옥수수의 수염은 꽃가루를 수정시키는 역할을 합니다.\n즉 옥수수 수염 하나에 하나가 하나의 알갱이를 만들어냅니다.`,
  },
].map((post) => ({ ...post, category: `INFORMATION` }));
