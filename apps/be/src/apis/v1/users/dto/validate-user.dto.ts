import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ValidateUserDto {
  @IsNotEmpty({ message: "이메일은 필수값입니다." })
  @IsEmail(undefined, { message: "이메일 형태만 입력이 가능합니다." })
  email: string;

  @IsNotEmpty({ message: "비밀번호는 필수값입니다." })
  @IsString({ message: "비밀번호는 문자열 형태만 가능합니다." })
  password: string;
}
