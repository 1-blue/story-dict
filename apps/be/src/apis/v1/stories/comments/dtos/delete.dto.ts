import { StoryCommentEntity, ToastEntity } from "#be/entities";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class DeleteStoryCommentParamDTO {
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

class DeleteStoryCommentResponsePayloadDTO extends StoryCommentEntity {}
export class DeleteStoryCommentResponseDTO {
  @ApiProperty({ description: "토스트 메시지" })
  toast: ToastEntity;

  @ApiProperty({ description: "삭제된 댓글" })
  payload: DeleteStoryCommentResponsePayloadDTO;
}
