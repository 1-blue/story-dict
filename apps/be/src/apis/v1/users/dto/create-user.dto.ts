import { UserProvider, UserRole } from "@prisma/client";
import { Transform } from "class-transformer";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from "class-validator";

import { USER_PROVIDERS, USER_ROLES } from "#be/apis/v1/users/constant";

export class CreateUserDto {
  @IsOptional()
  @IsUUID("all", { message: "유저 식별자는 UUID 형태만 입력이 가능합니다." })
  id?: string;

  @IsNotEmpty({ message: "이메일은 필수값입니다." })
  @IsEmail(undefined, { message: "이메일 형태만 입력이 가능합니다." })
  email: string;

  @IsNotEmpty()
  @IsString({ message: "비밀번호는 문자열 형태만 가능합니다." })
  password: string;

  @IsNotEmpty({ message: "닉네임은 필수값입니다." })
  @IsString({ message: "닉네임은 문자열 형태만 가능합니다." })
  nickname: string;

  @IsOptional()
  @IsPhoneNumber("KR", { message: "휴대폰 번호 형식만 가능합니다." })
  phone?: string;

  @IsOptional()
  @IsNumber({}, { message: "보유 금액은 숫자 형태만 가능합니다." })
  money?: number = 1_000;

  @IsOptional()
  @IsEnum(USER_ROLES, { message: "유효하지 않은 유저 역할입니다." })
  @Transform(({ value }) => value.toUpperCase())
  role?: UserRole = "USER";

  @IsOptional()
  @IsEnum(USER_PROVIDERS, { message: "유효하지 않은 유저 제공자입니다." })
  @Transform(({ value }) => value.toUpperCase())
  provider?: UserProvider = "LOCAL";

  @IsOptional()
  @IsString({ message: "유저 제공자의 식별자는 문자열 형태만 가능합니다." })
  providerId?: string;

  @IsOptional()
  @IsUUID("all", { message: "이미지 식별자는 UUID 형태만 입력이 가능합니다." })
  imageId?: string;
}
