"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export const revalidatePathForServer = (path: string) => {
  revalidatePath(path);
};
export const revalidateTagForServer = (tags: string[]) => {
  const METHODS = ["GET", "POST", "PATCH", "PUT", "DELETE"];

  tags
    .filter((tag) => !METHODS.includes(tag.toUpperCase()))
    .forEach((tag) => revalidateTag(tag));
};
