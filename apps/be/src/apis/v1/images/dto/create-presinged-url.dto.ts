import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class CreatePresignedURLBodyDTO {
  @IsNotEmpty({ message: "파일명은 필수값입니다." })
  @Matches(/^.+\.(jpg|jpeg|png|gif|svg)$/i, {
    message: `확장자를 포함한 전체 파일명을 전달해주세요.\n( 확장자는 jpg, jpeg, png, gif, svg만 가능합니다. )`,
  })
  @ApiProperty({
    description: "파일명",
    example: "image.jpg",
    type: "string",
  })
  filename: string;

  @IsOptional()
  @IsString({ message: "이미지의 상태는 문자열이어야 합니다." })
  @ApiProperty({
    description: "이미지의 상태",
    example: "public",
    type: "string",
    required: false,
  })
  status?: string;
}

class CreatePresignedURLFieldsDTO {
  @ApiProperty({
    description: "버킷",
    example: "storydict",
    type: "string",
  })
  bucket: string;

  @ApiProperty({
    description: "X-Amz-Algorithm",
    example: "X-Amz-Algorithm",
    type: "string",
  })
  "X-Amz-Algorithm": string;

  @ApiProperty({
    description: "X-Amz-Credential",
    example: "X-Amz-Credential",
    type: "string",
  })
  "X-Amz-Credential": string;

  @ApiProperty({
    description: "X-Amz-Date",
    example: "X-Amz-Date",
    type: "string",
  })
  "X-Amz-Date": string;

  @ApiProperty({
    description: "key",
    example: "key",
    type: "string",
  })
  key: string;

  @ApiProperty({
    description: "Policy",
    example: "Policy",
    type: "string",
  })
  Policy: string;

  @ApiProperty({
    description: "X-Amz-Signature",
    example: "X-Amz-Signature",
    type: "string",
  })
  "X-Amz-Signature": string;
}
class CreatePresignedURLResponsePayloadDTO {
  @ApiProperty({
    description: "URL",
    example: "https://s3.ap-northeast-2.amazonaws.com/storydict",
    type: "string",
  })
  url: string;

  @ApiProperty({ description: "필드 ( AWS에서 제공하는 필드 )" })
  fields: CreatePresignedURLFieldsDTO;
}
export class CreatePresignedURLResponseDTO {
  @ApiProperty({ description: "presignedURL 생성 결과" })
  payload: CreatePresignedURLResponsePayloadDTO;
}
