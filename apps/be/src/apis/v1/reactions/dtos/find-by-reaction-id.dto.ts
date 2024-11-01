import { IsNotEmpty, IsUUID } from "class-validator";

export class FindByReactionIdDto {
  @IsNotEmpty({ message: "리액션 식별자는 필수값입니다" })
  @IsUUID("all", { message: "UUID 형태만 입력이 가능합니다." })
  reactionId: string;
}
