import { ApiProperty } from "@nestjs/swagger";

export class ToastEntity {
  @ApiProperty({ description: "토스트 제목" })
  title: string;

  @ApiProperty({ description: "토스트 내용" })
  description: string;
}
