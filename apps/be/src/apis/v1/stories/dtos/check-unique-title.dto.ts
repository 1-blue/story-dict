import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CheckUniqueTitleBodyDTO {
  @IsString({ message: "검증할 제목은 문자열이어야 합니다." })
  @ApiProperty({
    description: "검증할 제목",
    example: "윤슬",
    type: "string",
  })
  title: string;
}

export class CheckUniqueTitleResponseDTO {
  @ApiProperty({
    description: "제목 중복 여부",
    type: "boolean",
    example: true,
  })
  payload: boolean;
}
