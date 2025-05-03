import { ApiProperty } from "@nestjs/swagger";

export class StoryCommentReplyEntity {
  @ApiProperty({
    description: "답글 식별자",
    type: "string",
    format: "uuid",
  })
  id: string;

  @ApiProperty({
    description: "생성 일자",
    type: "string",
    format: "date-time",
  })
  createdAt: Date;

  @ApiProperty({
    description: "수정 일자",
    type: "string",
    format: "date-time",
  })
  updatedAt: Date;

  @ApiProperty({
    description: "삭제 일자",
    nullable: true,
    type: "string",
    format: "date-time",
  })
  deletedAt: Date | null;

  @ApiProperty({
    description: "대댓글 내용",
    type: "string",
  })
  content: string;

  @ApiProperty({
    description: "유저 식별자",
    type: "string",
    format: "uuid",
  })
  userId: string;

  @ApiProperty({
    description: "스토리 식별자",
    type: "string",
    format: "uuid",
  })
  storyId: string;

  @ApiProperty({
    description: "댓글 식별자",
    type: "string",
    format: "uuid",
  })
  commentId: string;
}
