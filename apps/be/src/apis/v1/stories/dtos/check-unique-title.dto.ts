import { IsString } from "class-validator";

export class CheckUniqueTitleDto {
  @IsString({ message: "검증할 제목은 문자열이어야 합니다." })
  title: string;
}
