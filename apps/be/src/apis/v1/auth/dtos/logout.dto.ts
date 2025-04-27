import { ApiProperty } from "@nestjs/swagger";

import { ToastEntity } from "#be/entities";

export class LogOutResponseDTO {
  @ApiProperty({ description: "토스트 정보" })
  toast: ToastEntity;
}
