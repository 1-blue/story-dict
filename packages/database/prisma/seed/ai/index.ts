/// <reference types="node" />
/* eslint-disable @typescript-eslint/no-require-imports */
import type { Prisma } from "@sd/db";
import { SEED_ADMIN_USER_ID } from "../seed-ids";

const fs = require("fs");
const path = require("path");

const aiDir = __dirname;
const files = fs
  .readdirSync(aiDir)
  .filter((f: string) => f.endsWith(".ts") && f !== "index.ts");

type AiStoryInput = Pick<
  Prisma.StoryCreateInput,
  "title" | "summary" | "content" | "category" | "thumbnailPath"
>;

/** ai 폴더 내 *.ts 파일에서 스토리 배열을 로드 */
function loadStoriesFromFile(filePath: string): AiStoryInput[] {
  const module = require(filePath);
  const stories =
    module.default ??
    module.stories ??
    Object.values(module).find((v): v is AiStoryInput[] => Array.isArray(v));
  return stories ?? [];
}

/**
 * AI 생성 게시물들 (ai/*.ts 파일에서 동적 로드)
 * id는 고정 불필요 - title 기준 upsert
 */
export const seedAiStories: (AiStoryInput & {
  userId: string;
})[] = files.flatMap((file: string) => {
  const filePath = path.join(aiDir, file);
  const stories = loadStoriesFromFile(filePath);
  return stories.map((story) => ({
    ...story,
    userId: SEED_ADMIN_USER_ID,
  }));
});
