import { IsNotEmpty, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { StoryEntity, StoryReactionEntity, UserEntity } from "#be/entities";

export class GetOneStoryByIdParamDTO {
  @IsNotEmpty({ message: "스토리 식별자는 필수값입니다" })
  @IsUUID("all", { message: "UUID 형태만 입력이 가능합니다." })
  @ApiProperty({
    description: "스토리 식별자",
    example: "00000000-0000-0000-0000-000000000000",
    type: "string",
    format: "uuid",
  })
  storyId: string;
}

class GetOneStoryByIdResponsePayloadDTO extends StoryEntity {
  @ApiProperty({ description: "유저 식별자" })
  user: UserEntity;

  @ApiProperty({ description: "반응 목록" })
  reactions: StoryReactionEntity[];
}
export class GetOneStoryByIdResponseDTO {
  @ApiProperty({ description: "스토리 데이터" })
  payload: GetOneStoryByIdResponsePayloadDTO;
}
