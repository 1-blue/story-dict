import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "#be/apis/v0/prisma/prisma.service";
import { CreateCatDto } from "#be/apis/v1/cats/dto/create-cat.dto";
import { FindByIdDto } from "#be/dtos/find-by-id.dto";
import { UpdateCatDto } from "#be/apis/v1/cats/dto/update-cat.dto";

@Injectable()
export class CatsService {
  constructor(private readonly prismaService: PrismaService) {}

  /** 고양이 생성 */
  async create({ ...cat }: CreateCatDto) {
    await this.hasDuplicateName(cat.name);

    return await this.prismaService.cat.create({
      data: {
        ...cat,
      },
    });
  }

  /** 모든 고양이들 찾기 */
  async findAll() {
    return await this.prismaService.cat.findMany({});
  }

  /** 특정 고양이 찾기 */
  async findOne({ id }: FindByIdDto) {
    const exCat = await this.prismaService.cat.findUnique({
      where: { id },
    });
    if (!exCat) throw new NotFoundException("찾는 고양이가 존재하지 않습니다.");

    return exCat;
  }

  /** 특정 고양이 수정 */
  async update({ id }: FindByIdDto, { ...cat }: UpdateCatDto) {
    await this.findOne({ id });

    if (cat.name) await this.hasDuplicateName(cat.name);

    return await this.prismaService.cat.update({
      where: { id },
      data: {
        ...cat,
      },
    });
  }

  /** 특정 고양이 삭제 */
  async delete({ id }: FindByIdDto) {
    await this.findOne({ id });

    return await this.prismaService.cat.delete({
      where: { id },
    });
  }

  /** 고양이 이름 중복 여부 확인 ( 이미 존재하면 에러 던짐 ) */
  async hasDuplicateName(name: string) {
    const exCat = await this.prismaService.cat.findUnique({ where: { name } });

    if (!!exCat) throw new ConflictException("이미 사용중인 이름입니다.");
  }
}
