import { IsString } from "class-validator";

export class GetManyRandomStoryDto {
  @IsString({ message: "존재하는 이야기 식별자는 문자열 형태만 가능합니다." })
  existingIds: string;
}
