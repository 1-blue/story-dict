import { Injectable, NotFoundException } from "@nestjs/common";
import { S3 } from "aws-sdk";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

import { FindByIdDto } from "#be/dtos/find-by-id.dto";
import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { CreateImageDto } from "#be/apis/v1/images/dto/create-image.dto";
import { MoveImageDto } from "#be/apis/v1/images/dto/move-image.dto";
import { DeleteImageDto } from "#be/apis/v1/images/dto/delete-image.dto";
import { CreatePresignedURLDto } from "#be/apis/v1/images/dto/create-presinged-url.dto";
import { ImageStatus } from "@prisma/client";

@Injectable()
export class ImagesService {
  private readonly s3: S3;
  private readonly s3Client: S3Client;

  constructor(private readonly prismaService: PrismaService) {
    this.s3 = new S3({
      // 현재 사용중인 region ( "ap-northeast-2" )
      region: process.env.AWS_REGION,
      credentials: {
        // IAM에서 얻은 ACCESS_KEY
        accessKeyId: process.env.AWS_ACCESS_KEY,
        // IAM에서 얻은 ACCESS_SECRET_KEY
        secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
      },
    });
    this.s3Client = new S3Client({
      // 현재 사용중인 region ( "ap-northeast-2" )
      region: process.env.AWS_REGION,
      credentials: {
        // IAM에서 얻은 ACCESS_KEY
        accessKeyId: process.env.AWS_ACCESS_KEY,
        // IAM에서 얻은 ACCESS_SECRET_KEY
        secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
      },
    });
  }

  async create({
    id,
    name,
    url,
    status = "TEMP",
    purpose = "USER_PROFILE",
  }: CreateImageDto) {
    return await this.prismaService.image.create({
      data: { id, name, url, status, purpose },
    });
  }

  async findOne({ id }: FindByIdDto) {
    /** DB에 저장된 이미지인지 확인 */
    const exImageToDB = await this.prismaService.image.findUnique({
      where: { id },
    });
    if (!exImageToDB) {
      throw new NotFoundException("DB에 존재하지 않는 이미지입니다.");
    }

    /** S3에 저장된 이미지인지 확인 */
    const exImageToS3 = await this.s3
      .headObject({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: exImageToDB.url.slice(exImageToDB.url.indexOf("images/")),
      })
      .promise();
    if (!exImageToS3) {
      throw new NotFoundException("S3에 존재하지 않는 이미지입니다.");
    }

    return exImageToDB;
  }

  /**
   * + S3 이미지 이동
   *   1. 실제로 사용하는 이미지가 된 경우 이동 ( `use` )
   *   2. 이제 사용하지 않는 이미지가 된 경우 이동 ( `deleted` )
   *
   * @example
   * move({
   *   id: "99999999-9999-9999-9999-999999999999",
   *   beforeStatus: "temp",
   *   afterStatus: "use"
   * });
   **/
  async move({ id }: FindByIdDto, { beforeStatus, afterStatus }: MoveImageDto) {
    const exImage = await this.findOne({ id });

    // 1. https://no-service.s3.ap-northeast-2.amazonaws.com/images/development/temp/avatar_1709961663461.jpg
    const { url } = exImage;

    // 2. https://no-service.s3.ap-northeast-2.amazonaws.com/
    const baseURL = url.slice(0, url.indexOf("images/"));
    // 3. images/development/temp/avatar_1709961663461.jpg
    const key = url.slice(url.indexOf("images/"));
    // 4. images/development/temp/avatar_1709961663461.jpg
    const sourceKey = key;
    // 5. images/development/use/avatar_1709961663461.jpg
    const destinationKey = key.replace(beforeStatus, afterStatus);

    const copyParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      CopySource: `/${process.env.AWS_S3_BUCKET}/${sourceKey}`,
      Key: destinationKey,
    };

    const deleteParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: sourceKey,
    };

    try {
      // 객체 복사
      await this.s3.copyObject(copyParams).promise();

      // 객체 삭제
      await this.s3.deleteObject(deleteParams).promise();

      // DB 변경
      return await this.prismaService.image.update({
        where: { id },
        data: {
          url: baseURL + destinationKey,
          status: afterStatus.toUpperCase() as ImageStatus,
        },
      });
    } catch (error) {
      throw new NotFoundException("이동할 이미지를 찾을 수 없습니다.");
    }
  }

  /**
   * S3 이미지 삭제 ( 실제로는 삭제 폴더로 이동 )
   *
   * @example
   * delete({
   *   id: "99999999-9999-9999-9999-999999999999",
   *   beforeStatus: "use",
   * });
   **/
  async delete({ id }: FindByIdDto, { beforeStatus }: DeleteImageDto) {
    const exImage = await this.findOne({ id });

    // 1. https://no-service.s3.ap-northeast-2.amazonaws.com/images/development/temp/avatar_1709961663461.jpg
    const { url } = exImage;

    // 2. https://no-service.s3.ap-northeast-2.amazonaws.com/
    const baseURL = url.slice(0, url.indexOf("images/"));
    // 3. images/development/use/avatar_1709961663461.jpg
    const key = url.slice(url.indexOf("images/"));
    // 4. images/development/use/avatar_1709961663461.jpg
    const sourceKey = key;
    // 5. images/development/deleted/avatar_1709961663461.jpg
    const destinationKey = key.replace(beforeStatus, "deleted");

    const copyParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      CopySource: `/${process.env.AWS_S3_BUCKET}/${sourceKey}`,
      Key: destinationKey,
    };

    const deleteParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: sourceKey,
    };

    try {
      // 객체 복사
      await this.s3.copyObject(copyParams).promise();

      // 객체 삭제
      await this.s3.deleteObject(deleteParams).promise();

      // DB 변경
      return await this.prismaService.image.update({
        where: { id },
        data: {
          url: baseURL + destinationKey,
          status: "DELETED",
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      throw new NotFoundException("삭제할 이미지를 찾을 수 없습니다.");
    }
  }

  /**
   * S3 이미지 업로드 전용 `presignedURL`을 생성
   *
   * @description
   * 나만의 이미지 저장 규칙 ( `images / 실행환경 / 저장상태 / 원본파일명_시간.확장자` )
   * + 실행환경: `development` | `production` | `test`
   * + 저장상태
   *   0. `default`: 공용으로 사용하는 이미지
   *   1. `temp`: 임시 저장 ( 게시글 업로드 시 썸네일 입력 후 생성 취소한 경우 )
   *   2. `use`: 실제로 사용되는 이미지들
   *   3. `deleted`: 실제로 사용되다가 중지된 이미지 ( 업로드된 게시글을 지운 경우 썸네일 이미지 )
   **/
  async createPresignedURL({
    filename,
    status = "temp",
  }: CreatePresignedURLDto) {
    const [, ext] = filename.split(".");

    return await createPresignedPost(this.s3Client, {
      // 버킷명
      Bucket: process.env.AWS_S3_BUCKET,
      // 이미지 저장될 위치
      Key: `images/${process.env.NODE_ENV}/${status}/${Date.now()}.${ext}`,
      // 유효 기간 (초단위)
      Expires: 60,
      // 업로드될 파일 조건
      Conditions: [
        ["content-length-range", 0, 50 * 1024 ** 2],
        ["starts-with", "$Content-Type", "image/"],
      ],
    });
  }
}
