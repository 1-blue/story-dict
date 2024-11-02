import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
} from "class-validator";
import { ImagePurpose, ImageStatus } from "@prisma/client";

export class CreateImageDto {
  @IsOptional()
  @IsUUID("all", { message: "UUID 형태만 입력이 가능합니다." })
  id?: string;

  @IsNotEmpty({ message: "이미지 원본 이름은 필수값입니다." })
  @IsString({ message: "이미지 원본은 문자열 형태만 가능합니다." })
  name: string;

  @IsNotEmpty({ message: "파일이 업로드된 URL은 필수값입니다." })
  @IsUrl({}, { message: "유효한 URL이 아닙니다." })
  url: string;

  @IsOptional()
  @IsEnum(Object.values(ImageStatus), {
    message: "유효하지 않은 이미지 상태입니다.",
  })
  status?: ImageStatus = "TEMP";

  @IsOptional()
  @IsEnum(Object.values(ImagePurpose), {
    message: "유효하지 않은 이미지 목적입니다.",
  })
  purpose?: ImagePurpose = "USER_PROFILE";
}
