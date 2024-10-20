import { IsNotEmpty, IsUUID } from "class-validator";

export class FindByIdDto {
  @IsNotEmpty({ message: "식별자는 필수값입니다" })
  @IsUUID("all", { message: "UUID 형태만 입력이 가능합니다." })
  id: string;
}
