import { IsEnum, IsNotEmpty, IsOptional, Matches } from "class-validator";
import { Transform } from "class-transformer";
import type { ImageStatus } from "@prisma/client";

import { IMAGE_STATUSES } from "#be/apis/v1/images/constant";

export class CreatePresignedURLDto {
  @IsNotEmpty({ message: "파일명은 필수값입니다." })
  @Matches(/^.+\.(jpg|jpeg|png|gif|svg)$/i, {
    message: `확장자를 포함한 전체 파일명을 전달해주세요.\n( 확장자는 jpg, jpeg, png, gif, svg만 가능합니다. )`,
  })
  filename: string;

  @IsOptional()
  @IsEnum(IMAGE_STATUSES, { message: "유효하지 않은 이미지 상태입니다." })
  @Transform(({ value }) => value.toLowerCase())
  status?: Lowercase<ImageStatus> = "temp";
}
