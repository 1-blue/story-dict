import { v4 } from "uuid";
import { Cat } from "@prisma/client";

/** 고양이들 목데이터 */
export const mockCats: Pick<Cat, "id" | "name" | "age" | "gender">[] = [
  {
    id: v4(),
    name: "김독자",
    age: 28,
    gender: true,
  },
  {
    id: v4(),
    name: "유상아",
    age: 27,
    gender: false,
  },
  {
    id: v4(),
    name: "이길영",
    age: 11,
    gender: true,
  },
  {
    id: v4(),
    name: "한수영",
    age: 26,
    gender: false,
  },
];
