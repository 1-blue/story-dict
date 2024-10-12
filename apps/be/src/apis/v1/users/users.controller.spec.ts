import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { UsersController } from "#be/apis/v1/users/users.controller";
import { UsersService } from "#be/apis/v1/users/users.service";
import { UpdateUserDto } from "#be/apis/v1/users/dto/update-user.dto";
import { mockUsers } from "#be/apis/v1/users/__mocks__";

describe("UsersController", () => {
  let controller: UsersController;
  const NOT_EXIST_ID = "99999999-9999-9999-9999-999999999999";

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("[/api/v1/users] - 컨트롤러 및 서비스가 존재하는지?", () => {
    expect(controller).toBeDefined();
  });

  describe("🚀 유저 생성 ( 회원가입 )", () => {
    const cleanUser = {
      email: "중복안되는 이메일",
      password: "패스워드",
      nickname: "중복안되는 닉네임",
      phone: "중복안되는 휴대폰 번호",
    };

    // 생성
    it.each(
      mockUsers.map((user) => [
        user.id,
        user.email,
        user.password,
        user.nickname,
        user.money,
        user.phone,
        user.role,
      ]),
    )(
      "(POST) [/api/v1/users] - 유저가 생성되는지? ( %s )",
      async (id, email, password, nickname, money, phone, role) => {
        await controller.create({
          id,
          email,
          password,
          phone,
          nickname,
          money,
          role,
        });

        const exUser = await controller.findOne({ id });

        expect(exUser).toBeDefined();
      },
    );
    // 생성하려는 유저 이메일 중복 ( 409 )
    it("(POST) [/api/v1/users] - ( 409 ) 생성하려는 유저의 이메일이 이미 존재하는지?", async () => {
      try {
        await controller.create({
          ...cleanUser,
          email: mockUsers[0].email,
        });
        expect("").toThrow();
      } catch (error: any) {
        expect(error.response.statusCode).toBe(409);
        expect(error.response.message).toBe("이미 사용중인 이메일입니다.");
      }
    });
    // 생성하려는 유저 닉네임 중복 ( 409 )
    it("(POST) [/api/v1/users] - ( 409 ) 생성하려는 유저의 닉네임이 이미 존재하는지?", async () => {
      try {
        await controller.create({
          ...cleanUser,
          nickname: mockUsers[0].nickname,
        });
        expect("").toThrow();
      } catch (error: any) {
        expect(error.response.statusCode).toBe(409);
        expect(error.response.message).toBe("이미 사용중인 닉네임입니다.");
      }
    });
    // 생성하려는 유저 휴대폰 번호 중복 ( 409 )
    it("(POST) [/api/v1/users] - ( 409 ) 생성하려는 유저의 휴대폰 번호가 이미 존재하는지?", async () => {
      try {
        await controller.create({
          ...cleanUser,
          phone: mockUsers[0].phone,
        });
        expect("").toThrow();
      } catch (error: any) {
        expect(error.response.statusCode).toBe(409);
        expect(error.response.message).toBe("이미 사용중인 휴대폰 번호입니다.");
      }
    });
  });

  describe("🚀 유저 찾기", () => {
    // 전체 찾기
    it("(GET) [/api/v1/users] - 유저들이 모두 패칭되는지?", async () => {
      const exUsers = await controller.findAll();

      exUsers.forEach((exUser) => {
        delete exUser.createdAt;
        delete exUser.updatedAt;
        delete exUser.deletedAt;
        delete exUser.password;
        delete exUser.image;
        delete exUser.imageId;
      });

      exUsers.forEach((exUser, index) => {
        expect(exUser.id).toEqual(mockUsers[index].id);
        expect(exUser.email).toEqual(mockUsers[index].email);
        expect(exUser.nickname).toEqual(mockUsers[index].nickname);
        expect(exUser.money).toEqual(mockUsers[index].money);
        expect(exUser.phone).toEqual(mockUsers[index].phone);
      });
    });

    // 부분 찾기
    it.each(mockUsers.map((user) => [user.id]))(
      "(GET) [/api/v1/users/:userId] - 특정 유저가 패칭되는지? - %s",
      async (id) => {
        const exUser = await controller.findOne({ id });

        const targetMockUser = mockUsers.find((mockUser) => mockUser.id === id);

        expect(exUser.id).toEqual(targetMockUser.id);
        expect(exUser.email).toEqual(targetMockUser.email);
        expect(exUser.nickname).toEqual(targetMockUser.nickname);
        expect(exUser.money).toEqual(targetMockUser.money);
        expect(exUser.phone).toEqual(targetMockUser.phone);
      },
    );
    // 부분 찾기 실패 ( 404 )
    it("(GET) [/api/v1/users/:userId] - 찾으려는 유저가 존재하지 않는지?", async () => {
      try {
        await controller.findOne({ id: NOT_EXIST_ID });
        expect("").toThrow();
      } catch (error: any) {
        expect(error.response.statusCode).toBe(404);
        expect(error.response.message).toBe("찾는 유저가 존재하지 않습니다.");
      }
    });
  });

  describe("🚀 유저 수정", () => {
    const targetUserId = mockUsers[0].id;
    const toBeModified: UpdateUserDto = {
      nickname: "유중혁",
      email: "update@naver.com",
      money: 100_000,
      phone: "01012344321",
      role: "MANAGER",
    };

    // 수정
    it(`(PATCH) [/api/v1/users/:userId] - 유저가 수정되는지? - ${mockUsers[0].id}`, async () => {
      const updatedUser = await controller.update(
        { id: targetUserId },
        toBeModified,
      );

      // 변화된 데이터와 수정한 데이터가 일치하는지
      expect(updatedUser.id).toEqual(targetUserId);
      expect(updatedUser.email).toEqual(toBeModified.email);
      expect(updatedUser.nickname).toEqual(toBeModified.nickname);
      expect(updatedUser.money).toEqual(toBeModified.money);
      expect(updatedUser.phone).toEqual(toBeModified.phone);
    });
    // 수정 실패 ( 404 )
    it("(PATCH) [/api/v1/users/:userId] - 수정하려는 유저가 존재하지 않는지?", async () => {
      try {
        await controller.update({ id: NOT_EXIST_ID }, {});
        expect("").toThrow();
      } catch (error: any) {
        expect(error.response.statusCode).toBe(404);
        expect(error.response.message).toBe("찾는 유저가 존재하지 않습니다.");
      }
    });
    // 수정하려는 유저 이메일 중복 ( 409 )
    it("(PATCH) [/api/v1/users/:userId] - 수정하려는 유저의 이메일이 이미 존재하는지?", async () => {
      try {
        await controller.findOne({ id: targetUserId });
        await controller.update(
          { id: targetUserId },
          { email: toBeModified.email },
        );

        expect("").toThrow();
      } catch (error: any) {
        expect(error.response.statusCode).toBe(409);
        expect(error.response.message).toBe("이미 사용중인 이메일입니다.");
      }
    });
    // 수정하려는 유저 닉네임 중복 ( 409 )
    it("(PATCH) [/api/v1/users/:userId] - 수정하려는 유저의 닉네임이 이미 존재하는지?", async () => {
      try {
        await controller.findOne({ id: targetUserId });
        await controller.update(
          { id: targetUserId },
          { nickname: toBeModified.nickname },
        );

        expect("").toThrow();
      } catch (error: any) {
        expect(error.response.statusCode).toBe(409);
        expect(error.response.message).toBe("이미 사용중인 닉네임입니다.");
      }
    });
    // 수정하려는 유저 이메일 중복 ( 409 )
    it("(PATCH) [/api/v1/users/:userId] - 수정하려는 유저의 이메일이 이미 존재하는지?", async () => {
      try {
        await controller.findOne({ id: targetUserId });
        await controller.update(
          { id: targetUserId },
          { email: toBeModified.email },
        );

        expect("").toThrow();
      } catch (error: any) {
        expect(error.response.statusCode).toBe(409);
        expect(error.response.message).toBe("이미 사용중인 이메일입니다.");
      }
    });
  });

  describe("🚀 유저 유효성 검사 ", () => {
    const targetUser = mockUsers[1];

    describe("🚀 이메일 중복 검사", () => {
      // 존재하지 않는 이메일 중복 검사
      it("(POST) [/api/v1/users/check/email] - 존재하지 않는 이메일 중복 검사", async () => {
        // 에러 안나면 검사 통과
        await controller.hasDuplicateEmail({ email: "이메일@naver.com" });
        expect("").toBe("");
      });
      // 존재하는 이메일 중복 검사 ( 409 )
      it("(POST) [/api/v1/users/check/email] - 존재하는 이메일 중복 검사", async () => {
        try {
          await controller.hasDuplicateEmail({ email: targetUser.email });
          expect("").toThrow();
        } catch (error: any) {
          expect(error.response.statusCode).toBe(409);
          expect(error.response.message).toBe("이미 사용중인 이메일입니다.");
        }
      });
    });

    describe("🚀 닉네임 중복 검사", () => {
      // 존재하지 않는 닉네임 중복 검사
      it("(POST) [/api/v1/users/check/nickname] - 존재하지 않는 닉네임 중복 검사", async () => {
        // 에러 안나면 검사 통과
        await controller.hasDuplicateNickname({ nickname: "닉네임" });
        expect("").toBe("");
      });
      // 존재하는 닉네임 중복 검사 ( 409 )
      it("(POST) [/api/v1/users/check/nickname] - 존재하는 닉네임 중복 검사", async () => {
        try {
          await controller.hasDuplicateNickname({
            nickname: targetUser.nickname,
          });
          expect("").toThrow();
        } catch (error: any) {
          expect(error.response.statusCode).toBe(409);
          expect(error.response.message).toBe("이미 사용중인 닉네임입니다.");
        }
      });
    });

    describe("🚀 휴대폰 번호 중복 검사", () => {
      // 존재하지 않는 휴대폰 번호 중복 검사
      it("(POST) [/api/v1/users/check/phone] - 존재하지 않는 휴대폰 번호 중복 검사", async () => {
        // 에러 안나면 검사 통과
        await controller.hasDuplicatePhone({ phone: "0109999999" });
        expect("").toBe("");
      });
      // 존재하는 휴대폰 번호 중복 검사 ( 409 )
      it("(POST) [/api/v1/users/check/phone] - 존재하는 휴대폰 번호 중복 검사", async () => {
        try {
          await controller.hasDuplicatePhone({ phone: targetUser.phone });
          expect("").toThrow();
        } catch (error: any) {
          expect(error.response.statusCode).toBe(409);
          expect(error.response.message).toBe(
            "이미 사용중인 휴대폰 번호입니다.",
          );
        }
      });
    });

    describe("🚀 이메일 & 비밀번호 일치 유저 검사", () => {
      it("(POST) [/api/v1/users/validate] - 이메일과 비밀번호가 불일치하는 경우", async () => {
        try {
          await controller.validate({
            email: "이메일@naver.com",
            password: "이메일",
          });
          expect("").toThrow();
        } catch (error: any) {
          expect(error.response.statusCode).toBe(401);
          expect(error.response.message).toBe(
            "이메일 혹은 비밀번호가 유효하지 않습니다.",
          );
        }
      });
      it("(POST) [/api/v1/users/validate] - 이메일과 비밀번호가 일치하는 경우", async () => {
        const exUser = await controller.validate({
          email: targetUser.email,
          password: targetUser.password,
        });

        expect(exUser.id).toEqual(targetUser.id);
        expect(exUser.email).toEqual(targetUser.email);
        expect(exUser.nickname).toEqual(targetUser.nickname);
        expect(exUser.money).toEqual(targetUser.money);
        expect(exUser.phone).toEqual(targetUser.phone);
      });
    });
  });

  describe("🚀 유저 삭제 ( 회원탈퇴 )", () => {
    // 삭제
    it.each(mockUsers.map((cat) => [cat.id]))(
      "(DELETE) [/api/v1/users/:userId] - 유저 삭제 테스트 - %s",
      async (id) => {
        const deletedUser = await controller.delete({ id });

        // 하나의 컬럼이 변화되었으며
        expect(deletedUser.id).toEqual(id);
      },
    );
    // 삭제 실패 ( 404 )
    it("(DELETE) [/api/v1/users/:userId] - 삭제하려는 유저가 존재하지 않는지?", async () => {
      try {
        await controller.delete({ id: NOT_EXIST_ID });
        expect("").toThrow();
      } catch (error: any) {
        expect(error.response.statusCode).toBe(404);
        expect(error.response.message).toBe("찾는 유저가 존재하지 않습니다.");
      }
    });
  });
});
