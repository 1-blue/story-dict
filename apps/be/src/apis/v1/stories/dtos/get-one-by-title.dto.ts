import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { StoryEntity, StoryReactionEntity, UserEntity } from "#be/entities";

export class GetOneStoryByTitleParamDTO {
  @IsNotEmpty({ message: "스토리 제목은 필수값입니다" })
  @IsString({ message: "문자열만 입력이 가능합니다" })
  @ApiProperty({
    description: "스토리 제목",
    example: "윤슬",
    type: "string",
  })
  title: string;
}

class GetOneStoryByTitleResponsePayloadDTO extends StoryEntity {
  @ApiProperty({ description: "유저 식별자" })
  user: UserEntity;

  @ApiProperty({ description: "반응 목록" })
  reactions: StoryReactionEntity[];
}
export class GetOneStoryByTitleResponseDTO {
  @ApiProperty({ description: "스토리 데이터" })
  payload: GetOneStoryByTitleResponsePayloadDTO;
}
