import { ApiProperty, OmitType } from "@nestjs/swagger";
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

import { ToastEntity, UserEntity } from "#be/entities";

import { UserProvider, UserRole } from "@sd/db";

import { IsS3ImagePath } from "#be/decorators";
import { USER_PROVIDERS, USER_ROLES } from "#be/apis/v1/users/constant";

export class CreateUserBodyDTO {
  @IsOptional()
  @IsUUID("all", { message: "유저 식별자는 UUID 형태만 입력이 가능합니다." })
  @ApiProperty({
    description: "유저 식별자",
    required: false,
    type: "string",
    format: "uuid",
  })
  id?: string;

  @IsNotEmpty({ message: "이메일은 필수값입니다." })
  @IsEmail(undefined, { message: "이메일 형태만 입력이 가능합니다." })
  @ApiProperty({
    description: "이메일",
    required: true,
    type: "string",
    format: "email",
  })
  email: string;

  @IsNotEmpty({ message: "비밀번호는 필수값입니다." })
  @IsString({ message: "비밀번호는 문자열 형태만 가능합니다." })
  @ApiProperty({
    description: "비밀번호",
    required: true,
    type: "string",
  })
  password: string;

  @IsNotEmpty({ message: "닉네임은 필수값입니다." })
  @IsString({ message: "닉네임은 문자열 형태만 가능합니다." })
  @ApiProperty({
    description: "닉네임",
    required: true,
    type: "string",
  })
  nickname: string;

  @IsOptional()
  @IsPhoneNumber("KR", { message: "휴대폰 번호 형식만 가능합니다." })
  @ApiProperty({
    description: "휴대폰 번호",
    required: false,
    type: "string",
  })
  phone?: string;

  @IsOptional()
  @IsNumber({}, { message: "보유 금액은 숫자 형태만 가능합니다." })
  @ApiProperty({
    description: "보유 금액",
    required: false,
    type: "number",
  })
  money?: number = 1_000;

  @IsOptional()
  @IsEnum(USER_ROLES, { message: "유효하지 않은 유저 역할입니다." })
  @Transform(({ value }) => value.toUpperCase())
  @ApiProperty({
    description: "유저 역할",
    required: false,
    type: "string",
    enum: USER_ROLES,
  })
  role?: UserRole = "USER";

  @IsOptional()
  @IsS3ImagePath()
  @ApiProperty({
    description: "유저 이미지 경로",
    required: false,
    type: "string",
  })
  imagePath?: string;

  @IsOptional()
  @IsEnum(USER_PROVIDERS, { message: "유효하지 않은 유저 제공자입니다." })
  @Transform(({ value }) => value.toUpperCase())
  @ApiProperty({
    description: "유저 제공자",
    required: false,
    type: "string",
    enum: USER_PROVIDERS,
  })
  provider?: UserProvider = "LOCAL";

  @IsOptional()
  @IsString({ message: "유저 제공자의 식별자는 문자열 형태만 가능합니다." })
  @ApiProperty({
    description: "유저 제공자의 식별자",
    required: false,
    type: "string",
  })
  providerId?: string;
}

class CreateUserResponsePayloadDTO extends OmitType(UserEntity, ["password"]) {}
export class CreateUserResponseDTO {
  @ApiProperty({ description: "토스트 메시지" })
  toast: ToastEntity;

  @ApiProperty({ description: "회원가입한 유저 정보" })
  payload: CreateUserResponsePayloadDTO;
}
