/* eslint-disable @typescript-eslint/no-unused-vars */

import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { ImagesController } from "#be/apis/v1/images/images.controller";
import { ImagesService } from "#be/apis/v1/images/images.service";
import { mockImage } from "#be/apis/v1/images/__mocks__";

describe("ImagesController", () => {
  const NOT_EXIEST_ID = "000000000-0000-0000-0000-000000000000";
  let controller: ImagesController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [ImagesService, PrismaService],
    }).compile();

    controller = module.get<ImagesController>(ImagesController);
  });

  it("[/api/v1/images] - 컨트롤러 및 서비스가 존재하는지?", () => {
    expect(controller).toBeDefined();
  });

  describe("🚀 미리 서명된 URL", () => {
    // 생성
    it("(POST) [/api/v1/images/presigned-url] - 미리 서명된 URL이 생성되는지?", async () => {
      const { url, fields } = await controller.createPresignedURL({
        filename: "avatar.jpeg",
      });

      expect(url).toBeTruthy();
      expect(fields).toBeTruthy();
    });
  });

  describe("🚀 이미지 등록", () => {
    // 생성
    it("(POST) [/api/v1/images] - 이미지가 생성되는지?", async () => {
      const createdImage = await controller.create(mockImage);

      const { createdAt, updatedAt, deletedAt, ...restCreatedImage } =
        createdImage;

      expect(restCreatedImage).toEqual(mockImage);
    });
  });

  describe("🚀 이미지 찾기", () => {
    // 찾기
    it("(GET) [/api/v1/images] - 이미지가 패칭되는지?", async () => {
      const exImage = await controller.getOne({ id: mockImage.id });

      const { createdAt, updatedAt, deletedAt, ...restExImage } = exImage;

      expect(restExImage).toEqual(mockImage);
    });
    // 부분 찾기 실패 ( 404 )
    it("(GET) [/api/v1/cats/:catId] - 찾으려는 이미지가 존재하지 않는지?", async () => {
      try {
        await controller.getOne({ id: NOT_EXIEST_ID });
        expect("").toThrow();
      } catch (error: any) {
        expect(error.response.statusCode).toBe(404);
        expect(error.response.message).toBe("DB에 존재하지 않는 이미지입니다.");
      }
    });
  });

  describe("🚀 이미지 이동", () => {
    // 이동
    it("(PATCH) [/api/v1/images] - 이미지가 이동되는지?", async () => {
      const movedImage = await controller.move(
        { id: mockImage.id },
        { beforeStatus: "temp", afterStatus: "use" },
      );
      const { createdAt, updatedAt, deletedAt, ...restMovedImage } = movedImage;

      expect(restMovedImage.status).toEqual("USE");
    });
  });

  describe("🚀 이미지 삭제", () => {
    // 삭제
    it("(DELETE) [/api/v1/images] - 이미지가 삭제되는지?", async () => {
      const deletedImage = await controller.delete(
        { id: mockImage.id },
        { beforeStatus: "use" },
      );

      const { createdAt, updatedAt, deletedAt, ...restDeletedImage } =
        deletedImage;

      expect(restDeletedImage.status).toEqual("DELETED");
    });
  });

  describe("🚀 테스트 초기화", () => {
    // 이동
    it("(PATCH) [/api/v1/images] - 다음 테스트를 위한 이미지 원상복구 ( S3 )", async () => {
      const deletedImage = await controller.move(
        { id: mockImage.id },
        { beforeStatus: "deleted", afterStatus: "temp" },
      );

      const { createdAt, updatedAt, deletedAt, ...restDeletedImage } =
        deletedImage;

      expect(restDeletedImage.status).toEqual("TEMP");

      // DB에서 이미지 제거 ( 다음 테스트를 위함 )
      const prismaService = new PrismaService();
      prismaService.image.delete({ where: { id: mockImage.id } });
    });
  });
});
