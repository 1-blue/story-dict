import { v4 } from "uuid";
import { User } from "@prisma/client";

/** 유저들 목데이터 */
export const mockUsers: Omit<User, "createdAt" | "updatedAt" | "deletedAt">[] =
  [
    {
      id: v4(),
      email: "tls1111@naver.com",
      password: "1111",
      nickname: "김독자",
      phone: "0101111111",
      money: 10_000,
      role: "ADMIN",
      provider: "LOCAL",
      providerId: null,
      imageId: null,
    },
    {
      id: v4(),
      email: "tls2222@naver.com",
      password: "2222",
      nickname: "유상아",
      phone: "0102222111",
      money: 9_000,
      role: "MANAGER",
      provider: "LOCAL",
      providerId: null,
      imageId: null,
    },
    {
      id: v4(),
      email: "tls3333@naver.com",
      password: "3333",
      nickname: "한수영",
      phone: "0103333111",
      money: 8_000,
      role: "USER",
      provider: "LOCAL",
      providerId: null,
      imageId: null,
    },
    {
      id: v4(),
      email: "tls4444@naver.com",
      password: "4444",
      nickname: "정희원",
      phone: "0104444111",
      money: 1_000,
      role: "GUEST",
      provider: "LOCAL",
      providerId: null,
      imageId: null,
    },
  ];
