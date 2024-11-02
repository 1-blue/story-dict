import {
  IsOptional,
  IsNotEmpty,
  IsUUID,
  IsString,
  IsEnum,
} from "class-validator";
import { PostCategory } from "@prisma/client";

export class CreatePostDto {
  @IsOptional()
  @IsUUID("all", { message: "게시글 식별자는 UUID 형태만 입력이 가능합니다." })
  id?: string;

  @IsNotEmpty({ message: "게시글 이름은 필수값입니다." })
  @IsString({ message: "게시글 제목은 문자열 형태만 가능합니다." })
  title: string;

  @IsNotEmpty({ message: "게시글 내용은 필수값입니다." })
  @IsString({ message: "게시글 요약은 문자열 형태만 가능합니다." })
  summary: string;

  @IsNotEmpty({ message: "게시글 내용은 필수값입니다." })
  @IsString({ message: "게시글 내용은 문자열 형태만 가능합니다." })
  content: string;

  @IsOptional()
  @IsEnum(Object.values(PostCategory), {
    message: "유효하지 않은 게시글 카테고리입니다.",
  })
  category?: PostCategory = "GENERAL_KNOWLEDGE";

  @IsOptional()
  @IsUUID("all", { message: "썸네일 이미지는 UUID 형태만 입력이 가능합니다." })
  thumbnailId?: string;
}
