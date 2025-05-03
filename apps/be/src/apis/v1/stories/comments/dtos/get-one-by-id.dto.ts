import { IsNotEmpty, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import {
  StoryCommentEntity,
  StoryCommentReactionBasicEntity,
  ToastEntity,
  UserBasicEntity,
} from "#be/entities";

export class GetOneByIdStoryCommentParamDTO {
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

class GetOneByIdStoryCommentResponsePayloadDTO extends StoryCommentEntity {
  @ApiProperty({ description: "댓글 작성자" })
  user: UserBasicEntity;

  @ApiProperty({
    description: "댓글 리액션",
    type: [StoryCommentReactionBasicEntity],
  })
  reactions: StoryCommentReactionBasicEntity[];
}
export class GetOneByIdStoryCommentResponseDTO {
  @ApiProperty({ description: "토스트 메시지" })
  toast: ToastEntity;

  @ApiProperty({ description: "댓글" })
  payload: GetOneByIdStoryCommentResponsePayloadDTO;
}
