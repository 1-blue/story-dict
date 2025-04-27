import { ApiProperty } from "@nestjs/swagger";
import { ReactionType } from "@sd/db";

export class StoryCommentReplyReactionEntity {
  @ApiProperty({ description: "리액션 식별자" })
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

  @ApiProperty({
    description: "리액션 타입",
    enum: ReactionType,
    enumName: "ReactionType",
  })
  type: ReactionType;

  @ApiProperty({ description: "유저 식별자" })
  userId: string;

  @ApiProperty({ description: "스토리 식별자" })
  storyId: string;

  @ApiProperty({ description: "댓글 식별자" })
  commentId: string;

  @ApiProperty({ description: "대댓글 식별자" })
  replyId: string;
}
