import { IsOptional, IsNotEmpty, IsUUID, IsEnum } from "class-validator";
import { ReactionType } from "@prisma/client";

export class UpdateReactionDto {
  @IsOptional()
  @IsUUID("all", { message: "리액션 식별자는 UUID 형태만 입력이 가능합니다." })
  id?: string;

  @IsNotEmpty({ message: "리액션 타입은 필수값입니다." })
  @IsEnum(Object.values(ReactionType), {
    message: "유효하지 않은 리액션 타입입니다.",
  })
  type: ReactionType;
}
