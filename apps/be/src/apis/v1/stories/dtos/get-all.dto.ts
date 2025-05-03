import { ApiProperty } from "@nestjs/swagger";

import { StoryEntity } from "#be/entities";

class GetAllStoriesResponsePayloadDTO extends StoryEntity {}
export class GetAllStoriesResponseDTO {
  @ApiProperty({
    description: "모든 이야기 데이터",
    type: [GetAllStoriesResponsePayloadDTO],
  })
  payload: GetAllStoriesResponsePayloadDTO[];
}
