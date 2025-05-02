import {
  StoryCommentEntity,
  StoryCommentReactionEntity,
  ToastEntity,
  UserEntity,
} from "#be/entities";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UpdateStoryCommentParamDTO {
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
export class UpdateStoryCommentBodyDTO {
  @IsNotEmpty({ message: "댓글 내용은 필수값입니다." })
  @IsString({ message: "댓글 내용은 문자열 형태만 가능합니다." })
  @ApiProperty({
    description: "댓글 내용",
    type: "string",
    required: true,
  })
  content: string;
}

class UpdateStoryCommentResponsePayloadDTO extends StoryCommentEntity {
  @ApiProperty({ description: "댓글 작성자" })
  user: UserEntity;

  @ApiProperty({ description: "댓글 리액션" })
  reactions: StoryCommentReactionEntity[];
}
export class UpdateStoryCommentResponseDTO {
  @ApiProperty({ description: "토스트 메시지" })
  toast: ToastEntity;

  @ApiProperty({ description: "수정된 댓글" })
  payload: UpdateStoryCommentResponsePayloadDTO;
}
