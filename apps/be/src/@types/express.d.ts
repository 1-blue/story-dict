import type { User as UserType } from "@prisma/client";

declare global {
  namespace Express {
    interface User
      extends Pick<
        UserType,
        "id" | "nickname" | "role" | "email" | "provider"
      > {
      image?: Pick<ImageType, "id" | "url">;
    }
  }
}
