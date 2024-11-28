import { PostCategory } from "#be/types";
import { postCategoryToKoreanMap } from "@sd/utils";

export const CATEGORIES: { label: string; value: PostCategory }[] =
  Object.entries(postCategoryToKoreanMap).map(([key, value]) => ({
    label: value,
    value: key as PostCategory,
  }));
