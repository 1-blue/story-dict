import { IsNotEmpty, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class StoryCommentReactionHasReactionDTO {
  @IsNotEmpty({ message: "유저 식별자는 필수값입니다" })
  @IsUUID("all", { message: "유저 식별자는 UUID 형태만 입력이 가능합니다." })
  @ApiProperty({
    description: "유저 식별자",
    type: "string",
    format: "uuid",
  })
  userId: string;

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
