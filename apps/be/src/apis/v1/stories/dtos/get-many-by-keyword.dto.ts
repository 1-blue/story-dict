import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { StoryEntity, StoryReactionBasicEntity } from "#be/entities";

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
  @ApiProperty({
    description: "리액션 목록",
    type: [StoryReactionBasicEntity],
  })
  reactions: StoryReactionBasicEntity[];
}
export class GetManyByKeywordResponseDTO {
  @ApiProperty({
    description: "이야기 목록",
    type: [GetManyByKeywordResponsePayloadDTO],
  })
  payload: GetManyByKeywordResponsePayloadDTO[];
}
