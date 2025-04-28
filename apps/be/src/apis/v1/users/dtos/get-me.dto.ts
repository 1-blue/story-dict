import { ApiProperty, OmitType } from "@nestjs/swagger";

import { UserEntity } from "#be/entities";

class PayloadDTO extends OmitType(UserEntity, ["password"]) {}
export class GetMeResponseDTO {
  @ApiProperty({ description: "로그인한 유저 정보" })
  payload: PayloadDTO;
}
