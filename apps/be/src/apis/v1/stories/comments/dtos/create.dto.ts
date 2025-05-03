import { IsOptional, IsNotEmpty, IsUUID, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {
  StoryCommentEntity,
  StoryCommentReactionBasicEntity,
  ToastEntity,
  UserBasicEntity,
} from "#be/entities";

export class CreateStoryCommentParamDTO {
  @IsNotEmpty({ message: "이야기 식별자는 필수값입니다." })
  @IsUUID("all", { message: "이야기 식별자는 UUID 형태만 입력이 가능합니다." })
  @ApiProperty({
    description: "이야기 식별자",
    type: "string",
    format: "uuid",
  })
  storyId: string;
}
export class CreateStoryCommentBodyDTO {
  @IsOptional()
  @IsUUID("all", { message: "댓글 식별자는 UUID 형태만 입력이 가능합니다." })
  @ApiProperty({
    description: "댓글 식별자",
    type: "string",
    format: "uuid",
    required: false,
  })
  id?: string;

  @IsNotEmpty({ message: "댓글 내용은 필수값입니다." })
  @IsString({ message: "댓글 내용은 문자열 형태만 가능합니다." })
  @ApiProperty({
    description: "댓글 내용",
    type: "string",
    required: true,
  })
  content: string;
}

class CreateStoryCommentResponsePayloadDTO extends StoryCommentEntity {
  @ApiProperty({ description: "댓글 작성자" })
  user: UserBasicEntity;

  @ApiProperty({ description: "댓글 리액션" })
  reactions: StoryCommentReactionBasicEntity[];
}
export class CreateStoryCommentResponseDTO {
  @ApiProperty({ description: "토스트 메시지" })
  toast: ToastEntity;

  @ApiProperty({ description: "생성된 댓글" })
  payload: CreateStoryCommentResponsePayloadDTO;
}
