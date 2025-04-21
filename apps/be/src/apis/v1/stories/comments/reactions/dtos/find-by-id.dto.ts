import { IsNotEmpty, IsUUID } from "class-validator";

export class FindByStoryIdAndCommentIdDto {
  @IsNotEmpty({ message: "게시글 식별자는 필수값입니다" })
  @IsUUID("all", { message: "게시글 식별자는 UUID 형태만 입력이 가능합니다." })
  storyId: string;

  @IsNotEmpty({ message: "댓글 식별자는 필수값입니다" })
  @IsUUID("all", { message: "댓글 식별자는 UUID 형태만 입력이 가능합니다." })
  commentId: string;
}

export class FindByStoryIdAndCommentIdAndReactionIdDto {
  @IsNotEmpty({ message: "게시글 식별자는 필수값입니다" })
  @IsUUID("all", { message: "게시글 식별자는 UUID 형태만 입력이 가능합니다." })
  storyId: string;

  @IsNotEmpty({ message: "댓글 식별자는 필수값입니다" })
  @IsUUID("all", { message: "댓글 식별자는 UUID 형태만 입력이 가능합니다." })
  commentId: string;

  @IsNotEmpty({ message: "리액션 식별자는 필수값입니다" })
  @IsUUID("all", { message: "리액션 식별자는 UUID 형태만 입력이 가능합니다." })
  reactionId: string;
}
