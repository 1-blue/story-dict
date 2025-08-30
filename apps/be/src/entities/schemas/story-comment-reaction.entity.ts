import { ApiProperty, PickType } from "@nestjs/swagger";
import { ReactionType } from "@sd/db";

export class StoryCommentReactionEntity {
  @ApiProperty({
    description: "스토리 식별자",
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
    description: "리액션 타입",
    enum: ReactionType,
    enumName: "ReactionType",
  })
  type: ReactionType;

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

export class StoryCommentReactionBasicEntity extends PickType(
  StoryCommentReactionEntity,
  ["id", "type", "userId"],
) {}
