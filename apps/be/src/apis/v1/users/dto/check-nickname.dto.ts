import { IsNotEmpty, IsString } from "class-validator";

export class CheckNicknameDto {
  @IsNotEmpty({ message: "닉네임은 필수값입니다." })
  @IsString({ message: "닉네임은 문자열 형태만 가능합니다." })
  nickname: string;
}
