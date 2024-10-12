import { Image } from "@prisma/client";

/** 이미지 목데이터 */
export const mockImage: Omit<Image, "createdAt" | "updatedAt" | "deletedAt"> = {
  id: "99999999-9999-9999-9999-999999999999",
  name: "avatar.jpeg",
  url: "https://no-service.s3.ap-northeast-2.amazonaws.com/images/test/temp/avatar.jpeg",
  status: "TEMP",
  purpose: "USER_PROFILE",
};
