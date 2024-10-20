import { PostCategory, Prisma } from "@prisma/client";

const datas = [
  {
    title: `윤슬`,
    summary: `햇빛이나 달빛이 비치어 반짝이는 잔물결`,
    content: `\`햇빛이나 달빛이 비치어 반짝이는 잔물결\`을 의미하는 순우리말`,
    category: `PURE_KOREAN` as PostCategory,
  },
  {
    title: `바쿠스`,
    summary: `바쿠스는 그리스 로마 신화의 디오니소스의 라틴어 발음`,
    content: `바쿠스는 그리스 로마 신화의 디오니소스의 라틴어 발음입니다.\n피로회복제로 유명한 박카스는 바쿠스에서 유래된 말입니다.`,
    category: `ETYMOLOGY` as PostCategory,
  },
  {
    title: `플라톤`,
    summary: `플라톤은 "plat"(평평한)에서 유래된 말`,
    content: `그리스 철학자 플라톤의 원래 이름은 \`아리스토클레스\`입니다.\n어깨가 넓고 벌어져서 \`plat\`하다, 플라톤이라는 이름을 갖게 되었습니다.`,
    category: `ETYMOLOGY` as PostCategory,
  },
  {
    title: `마지노선`,
    summary: `제1차, 제2차 세계대전에서 생겨난 말`,
    content: `프랑스의 육군 장관인 \`앙드레 마지노\`에서 유래된 말입니다.`,
    category: `ETYMOLOGY` as PostCategory,
  },
  {
    title: `개복치`,
    summary: `사실 개복치는 매우 단단한 존재`,
    content: `개복치는 돌연사의 대명사이지만 사실 매우 단단한 생물입니다.\n하드웨어는 매우 단단하지만 소프트웨어가 약한 것일 뿐입니다.\n또한 개복치는 \`태양 물고기\`라고 불리기도 합니다.`,
    category: `INFORMATION` as PostCategory,
  },
];

/** 기본 게시물들 */
export const seedPosts: Prisma.PostCreateManyInput[] = datas.map(
  (data, index) => ({
    ...data,
    id: `00000000-0000-0000-0000-00000000000${index}`,
    userId: `00000000-0000-0000-0000-000000000000`,
  }),
);
