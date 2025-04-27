import { StoryCategory } from "@sd/db";
import { storyCategoryToKoreanMap } from "@sd/utils";

export const CATEGORIES: { label: string; value: StoryCategory }[] =
  Object.entries(storyCategoryToKoreanMap).map(([key, value]) => ({
    label: value,
    value: key as StoryCategory,
  }));
