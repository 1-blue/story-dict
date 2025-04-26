import {
  IsOptional,
  IsNotEmpty,
  IsUUID,
  IsString,
  IsEnum,
} from "class-validator";
import { IsS3ImagePath } from "#be/decorators";
import { StoryCategory } from "@sd/db";

export class CreateStoryDto {
  @IsOptional()
  @IsUUID("all", { message: "이야기 식별자는 UUID 형태만 입력이 가능합니다." })
  id?: string;

  @IsNotEmpty({ message: "이야기 이름은 필수값입니다." })
  @IsString({ message: "이야기 제목은 문자열 형태만 가능합니다." })
  title: string;

  @IsNotEmpty({ message: "이야기 요약은 필수값입니다." })
  @IsString({ message: "이야기 요약은 문자열 형태만 가능합니다." })
  summary: string;

  @IsNotEmpty({ message: "이야기 내용은 필수값입니다." })
  @IsString({ message: "이야기 내용은 문자열 형태만 가능합니다." })
  content: string;

  @IsOptional()
  @IsEnum(Object.values(StoryCategory), {
    message: "유효하지 않은 이야기 카테고리입니다.",
  })
  category?: StoryCategory = "GENERAL_KNOWLEDGE";

  @IsOptional()
  @IsS3ImagePath()
  thumbnailPath?: string;
}
