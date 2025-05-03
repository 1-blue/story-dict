import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { StoryEntity, StoryReactionBasicEntity } from "#be/entities";

export class GetManyRandomStoryQueryDTO {
  @IsString({ message: "존재하는 이야기 식별자는 문자열 형태만 가능합니다." })
  @ApiProperty({
    description: "존재하는 이야기 식별자",
    example: "1,2,3",
    type: "string",
  })
  existingIds: string;
}

class GetManyRandomStoryResponsePayloadDTO extends StoryEntity {
  reactions: StoryReactionBasicEntity[];
}
export class GetManyRandomStoryResponseDTO {
  @ApiProperty({ description: "랜덤 이야기 목록" })
  payload: GetManyRandomStoryResponsePayloadDTO;
}
