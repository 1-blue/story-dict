import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNotEmpty, IsUUID, IsEnum } from "class-validator";

import { ReactionType } from "@sd/db";
import { StoryCommentReactionEntity, ToastEntity } from "#be/entities";

export class CreateStoryCommentReactionParamDTO {
  @IsNotEmpty({ message: "이야기 식별자는 필수값입니다" })
  @IsUUID("all", { message: "이야기 식별자는 UUID 형태만 입력이 가능합니다." })
  @ApiProperty({
    description: "이야기 식별자",
    type: "string",
    format: "uuid",
  })
  storyId: string;

  @IsNotEmpty({ message: "댓글 식별자는 필수값입니다" })
  @IsUUID("all", { message: "댓글 식별자는 UUID 형태만 입력이 가능합니다." })
  @ApiProperty({
    description: "댓글 식별자",
    type: "string",
    format: "uuid",
  })
  commentId: string;
}
export class CreateStoryCommentReactionBodyDTO {
  @IsOptional()
  @IsUUID("all", { message: "리액션 식별자는 UUID 형태만 입력이 가능합니다." })
  @ApiProperty({
    description: "리액션 식별자",
    type: "string",
    format: "uuid",
  })
  id?: string;

  @IsNotEmpty({ message: "리액션 타입은 필수값입니다." })
  @IsEnum(Object.values(ReactionType), {
    message: "유효하지 않은 리액션 타입입니다.",
  })
  @ApiProperty({
    description: "리액션 타입",
    type: "string",
    enum: ReactionType,
  })
  type: ReactionType;
}

class CreateStoryCommentReactionResponsePayloadDTO extends StoryCommentReactionEntity {}
export class CreateStoryCommentReactionResponseDTO {
  @ApiProperty({ description: "토스트 메시지" })
  toast: ToastEntity;

  @ApiProperty({ description: "리액션" })
  payload: CreateStoryCommentReactionResponsePayloadDTO;
}
