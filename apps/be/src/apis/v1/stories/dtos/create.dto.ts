import {
  IsOptional,
  IsNotEmpty,
  IsUUID,
  IsString,
  IsEnum,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { StoryCategory } from "@sd/db";
import { IsS3ImagePath } from "#be/decorators";
import { StoryEntity, ToastEntity } from "#be/entities";

export class CreateStoryBodyDTO {
  @IsOptional()
  @IsUUID("all", { message: "이야기 식별자는 UUID 형태만 입력이 가능합니다." })
  @ApiProperty({
    description: "이야기 식별자",
    required: false,
    type: "string",
    format: "uuid",
  })
  id?: string;

  @IsNotEmpty({ message: "이야기 이름은 필수값입니다." })
  @IsString({ message: "이야기 제목은 문자열 형태만 가능합니다." })
  @ApiProperty({
    description: "이야기 제목",
    required: true,
    type: "string",
  })
  title: string;

  @IsNotEmpty({ message: "이야기 요약은 필수값입니다." })
  @IsString({ message: "이야기 요약은 문자열 형태만 가능합니다." })
  @ApiProperty({
    description: "이야기 요약",
    required: true,
    type: "string",
  })
  summary: string;

  @IsNotEmpty({ message: "이야기 내용은 필수값입니다." })
  @IsString({ message: "이야기 내용은 문자열 형태만 가능합니다." })
  @ApiProperty({
    description: "이야기 내용",
    required: true,
    type: "string",
  })
  content: string;

  @IsOptional()
  @IsEnum(Object.values(StoryCategory), {
    message: "유효하지 않은 이야기 카테고리입니다.",
  })
  @ApiProperty({
    description: "이야기 카테고리",
    required: false,
    type: "string",
    enum: StoryCategory,
  })
  category?: StoryCategory = "GENERAL_KNOWLEDGE";

  @IsOptional()
  @IsS3ImagePath()
  @ApiProperty({
    description: "이야기 썸네일 경로",
    required: false,
    type: "string",
    nullable: true,
  })
  thumbnailPath?: string | null;
}

class CreateStoryResponsePayloadDTO extends StoryEntity {}
export class CreateStoryResponseDTO {
  @ApiProperty({ description: "토스트 메시지" })
  toast: ToastEntity;

  @ApiProperty({ description: "생성된 이야기 데이터" })
  payload: CreateStoryResponsePayloadDTO;
}
