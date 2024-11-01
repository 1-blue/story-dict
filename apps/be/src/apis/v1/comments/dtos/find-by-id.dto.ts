import { IsNotEmpty, IsUUID } from "class-validator";

export class FindByPostIdDto {
  @IsNotEmpty({ message: "게시글 식별자는 필수값입니다" })
  @IsUUID("all", { message: "UUID 형태만 입력이 가능합니다." })
  postId: string;
}

export class FindByPostIdAndCommentIdDto {
  @IsNotEmpty({ message: "게시글 식별자는 필수값입니다" })
  @IsUUID("all", { message: "UUID 형태만 입력이 가능합니다." })
  postId: string;

  @IsNotEmpty({ message: "댓글 식별자는 필수값입니다" })
  @IsUUID("all", { message: "UUID 형태만 입력이 가능합니다." })
  commentId: string;
}
