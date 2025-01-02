import { Prisma } from "@sd/db";

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
  {
    title: `운전석 위치`,
    summary: `나라마다 다른 운전석 위치와 그 역사적 배경`,
    content: `운전석의 위치는 나라마다 다릅니다. 영국, 일본, 호주 등은 우측 운전석을, 한국, 미국, 유럽 대부분의 국가들은 좌측 운전석을 사용합니다.\n우측 운전석의 유래는 18세기 영국의 마차 문화에서 시작되었습니다. 당시 마부들은 오른손으로 마차를 제어하기 위해 왼쪽에 앉았고, 이는 자동차 시대에도 이어져 영국과 그 식민지였던 국가들에서 우측 운전석이 표준이 되었습니다.\n반면 나폴레옹 시대의 프랑스에서는 도로의 우측 통행이 시작되었고, 이에 맞춰 좌측 운전석이 채택되었습니다. 이후 프랑스의 영향을 받은 유럽 국가들과 미국에서도 이 방식이 보편화되었습니다.`,
  },
].map((post) => ({ ...post, category: `GENERAL_KNOWLEDGE` }));
