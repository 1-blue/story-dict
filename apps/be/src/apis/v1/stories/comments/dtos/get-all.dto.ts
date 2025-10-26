import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import {
  StoryCommentEntity,
  StoryCommentReactionBasicEntity,
  UserBasicEntity,
} from "#be/entities";

export class GetAllStoryCommentParamDTO {
  @IsNotEmpty({ message: "이야기 식별자는 필수값입니다" })
  @ApiProperty({
    description: "이야기 식별자",
    type: "string",
    format: "uuid",
  })
  storyId: string;
}

class GetAllStoryCommentResponsePayloadDTO extends StoryCommentEntity {
  @ApiProperty({ description: "댓글 작성자", type: UserBasicEntity })
  user: UserBasicEntity;

  @ApiProperty({
    description: "댓글 리액션",
    type: [StoryCommentReactionBasicEntity],
  })
  reactions: StoryCommentReactionBasicEntity[];
}
export class GetAllStoryCommentResponseDTO {
  @ApiProperty({
    description: "댓글",
    type: [GetAllStoryCommentResponsePayloadDTO],
  })
  payload: GetAllStoryCommentResponsePayloadDTO[];
}
