import { Prisma } from "@prisma/client";

/** 테스트용 데이터인 고양이들 */
export const seedCats: Prisma.CatCreateManyInput[] = [
  {
    name: "김독자",
    age: 28,
    gender: true,
  },
  {
    name: "유상아",
    age: 27,
    gender: false,
  },
  {
    name: "이길영",
    age: 11,
    gender: true,
  },
  {
    name: "한수영",
    age: 26,
    gender: false,
  },
  {
    name: "유중혁",
    age: 28,
    gender: true,
  },
  {
    name: "이지혜",
    age: 17,
    gender: false,
  },
  {
    name: "김남운",
    age: 18,
    gender: true,
  },
  {
    name: "신유승",
    age: 11,
    gender: false,
  },
];
