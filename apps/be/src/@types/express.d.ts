import type { User as UserType } from "@prisma/client";

declare global {
  namespace Express {
    interface User extends Omit<UserType, "password"> {}
  }
}
