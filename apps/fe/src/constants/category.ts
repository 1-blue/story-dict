import { PostCategory } from "@sd/db";
import { postCategoryToKoreanMap } from "@sd/utils";

export const CATEGORIES: { label: string; value: PostCategory }[] =
  Object.entries(postCategoryToKoreanMap).map(([key, value]) => ({
    label: value,
    value: key as PostCategory,
  }));
