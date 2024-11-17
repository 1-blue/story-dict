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
  {
    title: `모르핀`,
    summary: `양귀비에서 추출된 성분`,
    content: `고통을 잊게 하고 마치 꿈을 꾸는 듯한 느낌을 준다하여,\n그리스 신화에 등장하는 꿈의 신 \`모르페우스\`에서 유래된 말입니다.`,
    category: `ETYMOLOGY` as PostCategory,
  },
  {
    title: `카르만 라인`,
    summary: `지구의 대기권과 우주를 구분하는 경계`,
    content: `지상에서 100km 높이까지를 대기권이라고 부르는데, 이 경계선을 카르만 라인이라고 부릅니다.`,
    category: `GENERAL_KNOWLEDGE` as PostCategory,
  },
  {
    title: `귤락`,
    summary: `귤의 알맹이에 붙어있는 하얀 실`,
    content: `귤의 알맹이에 붙어있는 하얀 실을 귤락이라고 부릅니다.`,
    category: `GENERAL_KNOWLEDGE` as PostCategory,
  },
  {
    title: `함흥차사`,
    summary: `실제 함흥으로 보낸 차사에서 유래된 말`,
    content: `태종 이방원이 함흥으로 보낸 차사들이 모두 죽어 소식이 끊겨서 생긴 말\n\`뭘 실켜서 보냈는데 한참이 지나도 소식이 없는 사람\`을 뜻하는 말입니다.`,
    category: `ETYMOLOGY` as PostCategory,
  },
  {
    title: `온새미로`,
    summary: `언제나 변함없이`,
    content: `\`가르거나 쪼개지 않고 본래의 모습 그대로\`라는 뜻의 순우리말`,
    category: `PURE_KOREAN` as PostCategory,
  },
  {
    title: `숙주`,
    summary: `조선시대 관리인 신숙주를 비하하는 의미`,
    content: `신숙주는 단종을 배신하고 수양대군을 도운 변절자입니다.\n숙주나물도 쉽게 상하고 변질되는 특징을 가지고 있어서 숙주라는 이름을 갖게 되었습니다.`,
    category: `ETYMOLOGY` as PostCategory,
  },
  {
    title: `옥수수 알갱이와 수염`,
    summary: `알갱이와 수염의 개수는 거의 동일함`,
    content: `옥수수의 수염은 꽃가루를 수정시키는 역할을 합니다.\n즉 옥수수 수염 하나에 하나가 하나의 알갱이를 만들어냅니다.`,
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
