import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

import { StoryCategory } from "@sd/db";
import { StoryEntity, StoryReactionBasicEntity } from "#be/entities";

export class GetAllStoryByCategoryParamDTO {
  @IsEnum(Object.values(StoryCategory), {
    message: "유효하지 않은 이야기 카테고리입니다.",
  })
  @ApiProperty({
    description: "이야기 카테고리",
    example: "LOVE",
    enum: StoryCategory,
  })
  category: StoryCategory;
}

export class GetAllStoryByCategoryResponsePayloadDTO extends StoryEntity {
  @ApiProperty({
    description: "리액션 목록",
    type: [StoryReactionBasicEntity],
  })
  reactions: StoryReactionBasicEntity[];
}

export class GetAllStoryByCategoryResponseDTO {
  @ApiProperty({
    description: "이야기 목록",
    type: [GetAllStoryByCategoryResponsePayloadDTO],
  })
  payload: GetAllStoryByCategoryResponsePayloadDTO[];
}
