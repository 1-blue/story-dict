import { IsOptional, IsNotEmpty, IsUUID, IsString } from "class-validator";

export class CreateCommentDto {
  @IsOptional()
  @IsUUID("all", { message: "댓글 식별자는 UUID 형태만 입력이 가능합니다." })
  id?: string;

  @IsNotEmpty({ message: "댓글 내용은 필수값입니다." })
  @IsString({ message: "댓글 내용은 문자열 형태만 가능합니다." })
  content: string;

  @IsNotEmpty({ message: "게시글 식별자는 필수값입니다." })
  @IsUUID("all", { message: "게시글 식별자는 UUID 형태만 입력이 가능합니다." })
  postId: string;
}
