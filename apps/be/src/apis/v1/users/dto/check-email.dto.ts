import { IsEmail, IsNotEmpty } from "class-validator";

export class CheckEmailDto {
  @IsNotEmpty({ message: "이메일은 필수값입니다." })
  @IsEmail(undefined, { message: "이메일 형태만 입력이 가능합니다." })
  email: string;
}
