import { IsS3ImagePath } from "#be/decorators";
import { IsNotEmpty, IsString } from "class-validator";

export class MoveImageDto {
  @IsNotEmpty({ message: "이미지 경로는 필수값입니다." })
  @IsS3ImagePath()
  imagePath: string;

  @IsNotEmpty({ message: "변경전 상태는 필수값입니다." })
  @IsString({ message: "변경전 상태는 문자열 형태만 가능합니다." })
  beforeStatus: string;

  @IsNotEmpty({ message: "변경될 상태는 필수값입니다." })
  @IsString({ message: "변경될 상태는 문자열 형태만 가능합니다." })
  afterStatus: string;
}
