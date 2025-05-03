import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";

import { ToastEntity, UserEntity } from "#be/entities";

export class LogInBodyDTO extends PickType(UserEntity, ["email", "password"]) {}

class LogInResponsePayloadDTO extends OmitType(UserEntity, ["password"]) {}
export class LogInResponseDTO {
  @ApiProperty({ description: "토스트 정보" })
  toast: ToastEntity;

  @ApiProperty({ description: "유저 정보" })
  payload: LogInResponsePayloadDTO;
}
