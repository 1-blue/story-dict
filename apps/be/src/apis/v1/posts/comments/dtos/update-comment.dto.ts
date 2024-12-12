import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCommentDto {
  @IsNotEmpty({ message: "댓글 내용은 필수값입니다." })
  @IsString({ message: "댓글 내용은 문자열 형태만 가능합니다." })
  content: string;
}
