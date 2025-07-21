import { IsS3ImagePath } from "#be/decorators";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class MoveImageBodyDTO {
  @IsNotEmpty({ message: "이미지 경로는 필수값입니다." })
  @IsS3ImagePath()
  @ApiProperty({
    description: "이미지 경로",
    example: `https://storydict.s3.ap-northeast-2.amazonaws.com/images/development/temp/avatar_1709961663461.jpg`,
    type: "string",
  })
  imagePath: string;

  @IsNotEmpty({ message: "변경전 상태는 필수값입니다." })
  @IsString({ message: "변경전 상태는 문자열 형태만 가능합니다." })
  @ApiProperty({
    description: "변경전 상태",
    example: "temp",
    type: "string",
  })
  beforeStatus: string;

  @IsNotEmpty({ message: "변경될 상태는 필수값입니다." })
  @IsString({ message: "변경될 상태는 문자열 형태만 가능합니다." })
  @ApiProperty({
    description: "변경될 상태",
    example: "use",
    type: "string",
  })
  afterStatus: string;
}

class MoveImageResponsePayloadDTO {
  @IsNotEmpty({ message: "이미지 경로는 필수값입니다." })
  @IsS3ImagePath()
  @ApiProperty({
    description: "이동된 이미지 경로",
    example: `https://storydict.s3.ap-northeast-2.amazonaws.com/images/development/temp/avatar_1709961663461.jpg`,
    type: "string",
  })
  imagePath: string;
}
export class MoveImageResponseDTO {
  @ApiProperty({ description: "이미지 이동 결과" })
  payload: MoveImageResponsePayloadDTO;
}
