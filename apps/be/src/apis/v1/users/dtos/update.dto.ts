import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";

import { ToastEntity, UserEntity } from "#be/entities";
import { CreateUserBodyDTO } from "./create.dto";

export class UpdateUserDTO extends PartialType(
  OmitType(CreateUserBodyDTO, ["id", "password"]),
) {}

class UpdateUserResponsePayloadDTO extends OmitType(UserEntity, ["password"]) {}
export class UpdateUserResponseDTO {
  @ApiProperty({ description: "토스트 메시지" })
  toast: ToastEntity;

  @ApiProperty({ description: "수정된 유저 정보" })
  payload: UpdateUserResponsePayloadDTO;
}
