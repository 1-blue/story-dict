import { Prisma, UserProvider, UserRole } from "@prisma/client";

/** 기본 유저들 */
export const seedUsers: Prisma.UserCreateManyInput[] = [
  {
    id: "00000000-0000-0000-0000-000000000000",
    email: "developer@xstory.com",
    password: "$2b$10$91TVE/IsiQeVT0POxtFpEOW7ptgKSVbtHPHe9ymGgTdUo9/gFdZli",
    nickname: "개발자",
    role: "ADMIN" as UserRole,
    provider: "LOCAL" as UserProvider,
  },
  ...Array.from({ length: 10 }).map((_, index) => ({
    id: `00000000-0000-0000-0000-00000000000${index + 1}`,
    email: `developer${index + 1}@xstory.com`,
    password: "$2b$10$91TVE/IsiQeVT0POxtFpEOW7ptgKSVbtHPHe9ymGgTdUo9/gFdZli",
    nickname: `개발자 부계정 ${index + 1}`,
    role: "MANAGER" as UserRole,
    provider: "LOCAL" as UserProvider,
  })),
];
