import { IsNotEmpty, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { StoryEntity } from "#be/entities";

export class DeleteStoryParamDTO {
  @IsNotEmpty({ message: "이야기 식별자는 필수값입니다" })
  @IsUUID("all", { message: "UUID 형태만 입력이 가능합니다." })
  @ApiProperty({
    description: "이야기 식별자",
    example: "00000000-0000-0000-0000-000000000000",
    type: "string",
    format: "uuid",
  })
  storyId: string;
}

export class DeleteStoryResponseDTO {
  @ApiProperty({ description: "이야기 데이터" })
  payload: StoryEntity;
}
