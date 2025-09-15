import { ApiProperty } from "@nestjs/swagger";

import {
  StoryEntity,
  StoryReactionBasicEntity,
  UserBasicEntity,
} from "#be/entities";
import { IsNumber, IsOptional } from "class-validator";

export class GetManyShortsQueryDTO {
  @IsOptional()
  @IsNumber({}, { message: "쇼츠 페이지는 숫자 형태만 가능합니다." })
  @ApiProperty({
    description: "쇼츠 페이지",
    example: 1,
    type: "number",
  })
  page: number;

  @IsOptional()
  @IsNumber({}, { message: "쇼츠 개수는 숫자 형태만 가능합니다." })
  @ApiProperty({
    description: "쇼츠 개수",
    example: 1,
    type: "number",
  })
  limit: number;
}

class GetManyShortsResponsePayloadDTO extends StoryEntity {
  @ApiProperty({ description: "유저 식별자" })
  user: UserBasicEntity;

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
