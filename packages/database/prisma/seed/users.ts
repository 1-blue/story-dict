import { Prisma, UserProvider, UserRole } from "@sd/db";

/** 기본 유저들 */
export const seedUsers: Prisma.UserCreateManyInput[] = [
  {
    id: "00000000-0000-0000-0000-000000000000",
    email: "developer@sd.com",
    password: "$2b$10$91TVE/IsiQeVT0POxtFpEOW7ptgKSVbtHPHe9ymGgTdUo9/gFdZli",
    nickname: "개발자",
    role: "ADMIN" as UserRole,
    provider: "LOCAL" as UserProvider,
  },
  ...Array.from({ length: 10 }).map((_, index) => ({
    id: `00000000-0000-0000-0000-${index}00000000000`.slice(0, 36),
    email: `developer${index + 1}@sd.com`,
    password: "$2b$10$91TVE/IsiQeVT0POxtFpEOW7ptgKSVbtHPHe9ymGgTdUo9/gFdZli",
    nickname: `개발자 부계정 ${index + 1}`,
    role: "MANAGER" as UserRole,
    provider: "LOCAL" as UserProvider,
  })),
];
