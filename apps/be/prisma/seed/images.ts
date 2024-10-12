import { Prisma } from "@prisma/client";

/** 테스트용 데이터인 이미지들 */
export const seedImages: Prisma.ImageCreateManyInput[] = [
  {
    id: "00000000-0000-0000-0000-000000000000",
    name: "default-profile.png",
    url: "https://xstory-bucket.s3.ap-northeast-2.amazonaws.com/default-profile.png",
    status: "DEFAULT",
    purpose: "USER_PROFILE",
  },
];
