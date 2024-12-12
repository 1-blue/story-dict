import { IsEnum, IsNotEmpty } from "class-validator";
import { ReactionType } from "@sd/db";

export class UpdateReactionDto {
  @IsNotEmpty({ message: "리액션 타입은 필수값입니다." })
  @IsEnum(Object.values(ReactionType), {
    message: "유효하지 않은 리액션 타입입니다.",
  })
  type: ReactionType;
}
