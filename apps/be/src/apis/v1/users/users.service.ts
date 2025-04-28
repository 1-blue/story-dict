import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { Prisma } from "@sd/db";

import { compareValue, encryptionValue } from "#be/utils";
import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import {
  CheckEmailDTO,
  CheckNicknameDTO,
  CheckPhoneDTO,
  CreateUserBodyDTO,
  GetOneByIdDTO,
  UpdateUserDTO,
  ValidateUserDTO,
} from "#be/apis/v1/users/dtos";

@Injectable()
export class UsersService {
  /** `password`를 제외한 선택 옵션 */
  private readonly userSelectWithoutPassword: Prisma.UserSelect = {
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    email: true,
    nickname: true,
    phone: true,
    money: true,
    role: true,
    imagePath: true,
    provider: true,
    providerId: true,
  };

  constructor(private readonly prismaService: PrismaService) {}

  async create(user: CreateUserBodyDTO) {
    // email 중복 검사
    await this.hasDuplicateEmail({ email: user.email });

    // nickname 중복 검사
    await this.hasDuplicateNickname({ nickname: user.nickname });

    // phone 중복 검사
    if (user.phone) await this.hasDuplicatePhone({ phone: user.phone });

    // password 암호화
    const hashedPassword = await encryptionValue(user.password);

    return await this.prismaService.user.create({
      data: {
        ...user,
        password: hashedPassword,
        money: user.money || 1_000,
        role: user.role || "USER",
        provider: user.provider || "LOCAL",
      },
      select: this.userSelectWithoutPassword,
    });
  }

  async getOne({ userId }: GetOneByIdDTO) {
    // 유저 존재 여부 확인
    const exUser = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: this.userSelectWithoutPassword,
    });
    if (!exUser) throw new NotFoundException("찾는 유저가 존재하지 않습니다.");

    return exUser;
  }

  /** passport의 `deserializeUser`에서 사용 */
  async getUserBasicInfo({ userId }: GetOneByIdDTO) {
    const exUser = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        nickname: true,
        role: true,
        email: true,
        imagePath: true,
        provider: true,
      },
    });
    if (!exUser) throw new NotFoundException("찾는 유저가 존재하지 않습니다.");

    return exUser;
  }

  async update({ userId }: GetOneByIdDTO, user: UpdateUserDTO) {
    // 유저 존재 여부 확인
    await this.getOne({ userId });

    // 기존 데이터와 수정할 데이터 중복 여부 확인
    if (user.email) {
      await this.hasDuplicateEmail({ email: user.email });
    }
    if (user.nickname) {
      await this.hasDuplicateNickname({ nickname: user.nickname });
    }
    if (user.phone) {
      await this.hasDuplicatePhone({ phone: user.phone });
    }

    return await this.prismaService.user.update({
      where: { id: userId },
      data: user,
      select: this.userSelectWithoutPassword,
    });
  }

  async delete({ userId }: GetOneByIdDTO) {
    // 유저 존재 여부 확인
    await this.getOne({ userId });

    return await this.prismaService.user.delete({
      where: { id: userId },
      select: this.userSelectWithoutPassword,
    });
  }

  /** 이메일 중복 검사 */
  async hasDuplicateEmail({ email }: CheckEmailDTO) {
    const exUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (exUser) throw new ConflictException("이미 사용중인 이메일입니다.");
  }

  /** 닉네임 중복 검사 */
  async hasDuplicateNickname({ nickname }: CheckNicknameDTO) {
    const exUser = await this.prismaService.user.findUnique({
      where: { nickname },
    });

    if (exUser) throw new ConflictException("이미 사용중인 닉네임입니다.");
  }

  /** 휴대폰 번호 중복 검사 */
  async hasDuplicatePhone({ phone }: CheckPhoneDTO) {
    const exUser = await this.prismaService.user.findUnique({
      where: { phone },
    });

    if (exUser) throw new ConflictException("이미 사용중인 휴대폰 번호입니다.");
  }

  /** 이메일 & 비밀번호를 이용해서 유효한 유저인지 검증 */
  async validate({ email, password }: ValidateUserDTO) {
    const exUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!exUser) {
      throw new UnauthorizedException(
        "이메일 혹은 비밀번호가 유효하지 않습니다.",
      );
    }

    const isPasswordMatch = await compareValue(password, exUser.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException(
        "이메일 혹은 비밀번호가 유효하지 않습니다.",
      );
    }

    // 비밀번호 제외
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = exUser;

    return userWithoutPassword;
  }

  /** OAuth 로그인된 기록 기반으로 유저 정보 찾기 */
  async getOneByProviderId(providerId?: string) {
    const exUser = await this.prismaService.user.findUnique({
      where: { providerId },
      select: this.userSelectWithoutPassword,
    });

    return exUser;
  }
}
