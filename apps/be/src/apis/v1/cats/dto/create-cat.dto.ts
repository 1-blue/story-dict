import {
  IsOptional,
  IsNotEmpty,
  IsUUID,
  IsString,
  IsNumber,
  IsBoolean,
} from "class-validator";

export class CreateCatDto {
  @IsOptional()
  @IsUUID("all", { message: "고양이 식별자는 UUID 형태만 입력이 가능합니다." })
  id?: string;

  @IsNotEmpty({ message: "고양이 이름은 필수값입니다." })
  @IsString({ message: "고양이 이름은 문자열 형태만 가능합니다." })
  name: string;

  @IsNotEmpty({ message: "고양이 나이는 필수값입니다." })
  @IsNumber({}, { message: "고양이 이름은 숫자 형태만 가능합니다." })
  age: number;

  @IsOptional()
  @IsBoolean({ message: "고양이 이름은 불리언 형태만 가능합니다." })
  gender?: boolean;

  @IsOptional()
  @IsUUID("all", {
    message: "고양이의 이미지는 UUID 형태만 입력이 가능합니다.",
  })
  imageId?: string;
}
