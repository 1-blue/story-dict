import { ApiProperty } from "@nestjs/swagger";
import { StoryCategory } from "@sd/db";

export class StoryEntity {
  @ApiProperty({ description: "스토리 식별자" })
  id: string;

  @ApiProperty({ description: "생성 일자" })
  createdAt: Date;

  @ApiProperty({ description: "수정 일자" })
  updatedAt: Date;

  @ApiProperty({
    description: "삭제 일자",
    nullable: true,
    type: "string",
    format: "date-time",
  })
  deletedAt: Date | null;

  @ApiProperty({ description: "스토리 제목" })
  title: string;

  @ApiProperty({ description: "스토리 요약" })
  summary: string;

  @ApiProperty({ description: "스토리 내용" })
  content: string;

  @ApiProperty({
    description: "스토리 썸네일 이미지 경로",
    nullable: true,
    type: "string",
  })
  thumbnailPath: string | null;

  @ApiProperty({
    description: "스토리 카테고리",
    enum: StoryCategory,
    enumName: "StoryCategory",
    default: StoryCategory.GENERAL_KNOWLEDGE,
  })
  category: StoryCategory;

  @ApiProperty({ description: "유저 식별자" })
  userId: string;
}
