import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CheckPhoneDto {
  @IsNotEmpty({ message: "휴대폰 번호는 필수값입니다." })
  @IsPhoneNumber("KR", { message: "휴대폰 번호 형식만 가능합니다." })
  phone: string;
}
