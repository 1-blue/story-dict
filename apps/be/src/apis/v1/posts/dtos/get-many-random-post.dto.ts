import { IsString } from "class-validator";

export class GetManyRandomPostDto {
  @IsString({ message: "존재하는 게시글 식별자는 문자열 형태만 가능합니다." })
  existingIds: string;
}
