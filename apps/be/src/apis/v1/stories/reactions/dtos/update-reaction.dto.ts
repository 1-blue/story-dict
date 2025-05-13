import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { ReactionType } from "@sd/db";
import { StoryReactionEntity, ToastEntity } from "#be/entities";

export class UpdateStoryReactionParamDTO {
  @IsNotEmpty({ message: "스토리 식별자는 필수값입니다" })
  @IsUUID("all", { message: "스토리 식별자는 UUID 형태만 입력이 가능합니다." })
  @ApiProperty({
    description: "스토리 식별자",
    type: "string",
    format: "uuid",
  })
  storyId: string;

  @IsNotEmpty({ message: "리액션 식별자는 필수값입니다" })
  @IsUUID("all", { message: "리액션 식별자는 UUID 형태만 입력이 가능합니다." })
  @ApiProperty({
    description: "리액션 식별자",
    type: "string",
    format: "uuid",
  })
  reactionId: string;
}
export class UpdateStoryReactionBodyDTO {
  @IsNotEmpty({ message: "리액션 타입은 필수값입니다." })
  @IsEnum(Object.values(ReactionType), {
    message: "유효하지 않은 리액션 타입입니다.",
  })
  @ApiProperty({
    description: "리액션 타입",
    enum: ReactionType,
    required: true,
  })
  type: ReactionType;
}

class UpdateStoryReactionResponsePayloadDTO extends StoryReactionEntity {}
export class UpdateStoryReactionResponseDTO {
  @ApiProperty({ description: "토스트 메시지" })
  toast: ToastEntity;

  @ApiProperty({ description: "수정된 리액션" })
  payload: UpdateStoryReactionResponsePayloadDTO;
}
