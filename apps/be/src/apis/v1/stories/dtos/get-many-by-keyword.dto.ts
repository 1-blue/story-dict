import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { StoryEntity, StoryReactionEntity, UserEntity } from "#be/entities";

export class GetManyByKeywordParamDTO {
  @IsString({ message: "검색어는 문자열 형태만 가능합니다." })
  @ApiProperty({
    description: "검색어",
    example: "키워드",
    type: "string",
  })
  keyword: string;
}

class GetManyByKeywordResponsePayloadDTO extends StoryEntity {
  @ApiProperty({ description: "유저 데이터" })
  user: UserEntity;

  @ApiProperty({ description: "리액션 목록" })
  reactions: StoryReactionEntity[];
}
export class GetManyByKeywordResponseDTO {
  @ApiProperty({ description: "이야기 목록" })
  payload: GetManyByKeywordResponsePayloadDTO[];
}
