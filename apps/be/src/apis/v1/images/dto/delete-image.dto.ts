import { IsEnum, IsNotEmpty } from "class-validator";
import { ImageStatus } from "@sd/db";

export class DeleteImageDto {
  @IsNotEmpty({ message: "변경전 상태는 필수값입니다." })
  @IsEnum(Object.values(ImageStatus), {
    message: "유효하지 않은 이미지 상태입니다.",
  })
  beforeStatus: Exclude<Lowercase<ImageStatus>, "default">;
}