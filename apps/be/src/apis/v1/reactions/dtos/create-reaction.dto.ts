import { IsOptional, IsNotEmpty, IsUUID, IsEnum } from "class-validator";
import { ReactionType } from "@prisma/client";

export class CreateReactionDto {
  @IsOptional()
  @IsUUID(4, { message: "리액션 식별자는 UUID 형태만 입력이 가능합니다." })
  id?: string;

  @IsNotEmpty({ message: "리액션 타입은 필수값입니다." })
  @IsEnum(Object.values(ReactionType), {
    message: "유효하지 않은 리액션 타입입니다.",
  })
  type: ReactionType;

  @IsNotEmpty({ message: "유저 식별자는 필수값입니다." })
  @IsUUID(4, { message: "유저 식별자는 UUID 형태만 입력이 가능합니다." })
  userId: string;

  @IsOptional()
  @IsUUID(4, { message: "게시글 식별자는 UUID 형태만 입력이 가능합니다." })
  postId?: string;

  @IsOptional()
  @IsUUID(4, { message: "댓글 식별자는 UUID 형태만 입력이 가능합니다." })
  commentId?: string;

  @IsOptional()
  @IsUUID(4, { message: "답글 식별자는 UUID 형태만 입력이 가능합니다." })
  replyId?: string;
}
