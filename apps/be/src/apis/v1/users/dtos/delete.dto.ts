import { ApiProperty, OmitType } from "@nestjs/swagger";

import { ToastEntity, UserEntity } from "#be/entities";

class PayloadDTO extends OmitType(UserEntity, ["password"]) {}
export class DeleteUserResponseDTO {
  @ApiProperty({ description: "토스트 메시지" })
  toast: ToastEntity;

  @ApiProperty({ description: "삭제된 유저 정보" })
  payload: PayloadDTO;
}
