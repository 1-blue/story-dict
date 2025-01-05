import { IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class CreatePresignedURLDto {
  @IsNotEmpty({ message: "파일명은 필수값입니다." })
  @Matches(/^.+\.(jpg|jpeg|png|gif|svg)$/i, {
    message: `확장자를 포함한 전체 파일명을 전달해주세요.\n( 확장자는 jpg, jpeg, png, gif, svg만 가능합니다. )`,
  })
  filename: string;

  @IsOptional()
  @IsString({ message: "이미지의 상태는 문자열이어야 합니다." })
  status?: string;
}
