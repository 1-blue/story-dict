import type { User as UserType } from "@sd/db";

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
