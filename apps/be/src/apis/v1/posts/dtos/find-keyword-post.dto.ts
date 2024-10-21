import { IsString } from "class-validator";

export class FindKeywordPostDto {
  @IsString({ message: "검색어는 문자열 형태만 가능합니다." })
  keyword: string;
}
