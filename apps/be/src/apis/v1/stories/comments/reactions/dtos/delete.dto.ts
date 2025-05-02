import { IsNotEmpty, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { StoryCommentReactionEntity, ToastEntity } from "#be/entities";

export class DeleteStoryCommentReactionParamDTO {
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

  @IsNotEmpty({ message: "리액션 식별자는 필수값입니다" })
  @IsUUID("all", { message: "리액션 식별자는 UUID 형태만 입력이 가능합니다." })
  @ApiProperty({
    description: "리액션 식별자",
    type: "string",
    format: "uuid",
  })
  reactionId: string;
}

class DeleteStoryCommentReactionResponsePayloadDTO extends StoryCommentReactionEntity {}
export class DeleteStoryCommentReactionResponseDTO {
  @ApiProperty({ description: "토스트 메시지" })
  toast: ToastEntity;

  @ApiProperty({ description: "수정된 리액션" })
  payload: DeleteStoryCommentReactionResponsePayloadDTO;
}
