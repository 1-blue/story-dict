import { IsNotEmpty, IsString } from "class-validator";

export class GetOneStoryByTitleDto {
  @IsNotEmpty({ message: "게시글 제목은 필수값입니다" })
  @IsString({ message: "문자열만 입력이 가능합니다" })
  title: string;
}
