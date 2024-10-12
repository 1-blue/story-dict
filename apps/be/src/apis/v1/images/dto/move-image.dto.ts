import { IsEnum, IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";
import type { ImageStatus } from "@prisma/client";

import { IMAGE_STATUSES } from "#be/apis/v1/images/constant";

export class MoveImageDto {
  @IsNotEmpty({ message: "변경전 상태는 필수값입니다." })
  @IsEnum(IMAGE_STATUSES, { message: "유효하지 않은 이미지 상태입니다." })
  @Transform(({ value }) => value.toLowerCase())
  beforeStatus: Exclude<Lowercase<ImageStatus>, "default">;

  @IsNotEmpty({ message: "변경될 상태는 필수값입니다." })
  @IsEnum(IMAGE_STATUSES, { message: "유효하지 않은 이미지 상태입니다." })
  @Transform(({ value }) => value.toLowerCase())
  afterStatus: Exclude<Lowercase<ImageStatus>, "default">;
}
