import { ApiProperty } from "@nestjs/swagger";

import { StoryEntity, StoryReactionBasicEntity } from "#be/entities";

export class GetManyShortsParamDTO {}

class GetManyShortsResponsePayloadDTO extends StoryEntity {
  @ApiProperty({
    description: "리액션 목록",
    type: [StoryReactionBasicEntity],
  })
  reactions: StoryReactionBasicEntity[];
}
export class GetManyShortsResponseDTO {
  @ApiProperty({
    description: "이야기 목록",
    type: [GetManyShortsResponsePayloadDTO],
  })
  payload: GetManyShortsResponsePayloadDTO[];
}
