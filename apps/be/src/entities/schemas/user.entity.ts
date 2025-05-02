import { ApiProperty } from "@nestjs/swagger";
import { UserProvider, UserRole } from "@sd/db";

export class UserEntity {
  @ApiProperty({
    description: "유저 식별자",
    type: "string",
    format: "uuid",
  })
  id: string;

  @ApiProperty({
    description: "생성 일자",
    type: "string",
    format: "date-time",
  })
  createdAt: Date;

  @ApiProperty({
    description: "수정 일자",
    type: "string",
    format: "date-time",
  })
  updatedAt: Date;

  @ApiProperty({
    description: "삭제 일자",
    nullable: true,
    type: "string",
    format: "date-time",
  })
  deletedAt: Date | null;

  @ApiProperty({
    description: "유저 이메일",
    type: "string",
  })
  email: string;

  @ApiProperty({
    description: "유저 비밀번호",
    type: "string",
  })
  password: string;

  @ApiProperty({
    description: "유저 소지금",
    default: 1000,
    type: "number",
  })
  money: number;

  @ApiProperty({
    description: "유저 닉네임",
    type: "string",
  })
  nickname: string;

  @ApiProperty({
    description: "유저 휴대폰 번호",
    nullable: true,
    type: "string",
  })
  phone: string | null;

  @ApiProperty({
    description: "유저 역할",
    enum: UserRole,
    enumName: "UserRole",
  })
  role: UserRole;

  @ApiProperty({
    description: "유저 이미지 경로",
    nullable: true,
    type: "string",
  })
  imagePath: string | null;

  @ApiProperty({
    description: "유저 로그인 방식",
    enum: UserProvider,
    enumName: "UserProvider",
  })
  provider: UserProvider;

  @ApiProperty({
    description: "유저 로그인 방식 식별자 (OAuth인 경우 제공받는 값)",
    nullable: true,
    type: "string",
  })
  providerId: string | null;
}
