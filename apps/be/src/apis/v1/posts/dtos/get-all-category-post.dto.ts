import { IsEnum } from "class-validator";
import { PostCategory } from "@sd/db";

export class GetAllCategoryPostDto {
  @IsEnum(Object.values(PostCategory), {
    message: "유효하지 않은 게시글 카테고리입니다.",
  })
  category: PostCategory;
}
