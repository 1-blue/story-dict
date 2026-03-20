import type { components } from "#fe/@types/openapi";
import { storyCategoryToKoreanMap } from "@sd/utils";

type StoryCategory = components["schemas"]["StoryCategory"];

export const CATEGORIES: { label: string; value: StoryCategory }[] =
  Object.entries(storyCategoryToKoreanMap).map(([key, value]) => ({
    label: value,
    value: key as StoryCategory,
  }));
