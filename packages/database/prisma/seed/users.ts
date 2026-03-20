import { Prisma, UserProvider, UserRole } from "@sd/db";
import {
  SEED_ADMIN_USER_ID,
  SEED_STORY_BOT_USER_ID,
  toSeedUuid,
} from "./seed-ids";

/** 기본 유저들 */
export const seedUsers: Prisma.UserCreateManyInput[] = [
  {
    id: SEED_ADMIN_USER_ID,
    email: "developer@sd.com",
    password: "$2b$10$91TVE/IsiQeVT0POxtFpEOW7ptgKSVbtHPHe9ymGgTdUo9/gFdZli",
    nickname: "개발자",
    role: "ADMIN" as UserRole,
    provider: "LOCAL" as UserProvider,
  },
  {
    id: SEED_STORY_BOT_USER_ID,
    email: "storybot@sd.com",
    password: "$2b$10$91TVE/IsiQeVT0POxtFpEOW7ptgKSVbtHPHe9ymGgTdUo9/gFdZli",
    nickname: "이야기봇",
    role: "MANAGER" as UserRole,
    provider: "LOCAL" as UserProvider,
  },
  ...Array.from({ length: 10 }).map((_, index) => ({
    id: toSeedUuid("00000000", (index + 1).toString().padStart(12, "0")),
    email: `developer${index + 1}@sd.com`,
    password: "$2b$10$91TVE/IsiQeVT0POxtFpEOW7ptgKSVbtHPHe9ymGgTdUo9/gFdZli",
    nickname: `개발자 부계정 ${index + 1}`,
    role: "MANAGER" as UserRole,
    provider: "LOCAL" as UserProvider,
  })),
];
