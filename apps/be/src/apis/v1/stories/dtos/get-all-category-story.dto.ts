import { IsEnum } from "class-validator";
import { StoryCategory } from "@sd/db";

export class GetAllCategoryStoryDto {
  @IsEnum(Object.values(StoryCategory), {
    message: "유효하지 않은 게시글 카테고리입니다.",
  })
  category: StoryCategory;
}
