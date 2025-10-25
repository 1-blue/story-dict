"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export const revalidatePathForServer = async (path: string) => {
  revalidatePath(path);
};
export const revalidateTagForServer = async (tags: string[]) => {
  const METHODS = ["GET", "POST", "PATCH", "PUT", "DELETE"];

  tags
    .filter((tag) => !METHODS.includes(tag.toUpperCase()))
    .forEach((tag) => revalidateTag(tag));
};
