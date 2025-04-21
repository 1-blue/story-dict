import { IsNotEmpty, IsUUID } from "class-validator";

export class HasReactionDto {
  @IsNotEmpty({ message: "유저 식별자는 필수값입니다." })
  @IsUUID("all", { message: "유저 식별자는 UUID 형태만 입력이 가능합니다." })
  userId: string;

  @IsNotEmpty({ message: "게시글 식별자는 필수값입니다." })
  @IsUUID("all", { message: "게시글 식별자는 UUID 형태만 입력이 가능합니다." })
  storyId: string;
}
