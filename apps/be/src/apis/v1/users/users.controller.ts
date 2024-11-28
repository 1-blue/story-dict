import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import type { Request } from "express";

import { UsersService } from "#be/apis/v1/users/users.service";
import { CreateUserDto } from "#be/apis/v1/users/dto/create-user.dto";
import { UpdateUserDto } from "#be/apis/v1/users/dto/update-user.dto";
import { CheckEmailDto } from "#be/apis/v1/users/dto/check-email.dto";
import { CheckNicknameDto } from "#be/apis/v1/users/dto/check-nickname.dto";
import { CheckPhoneDto } from "#be/apis/v1/users/dto/check-phone.dto";
import { ValidateUserDto } from "#be/apis/v1/users/dto/validate-user.dto";
import { IsLoggedIn, IsLoggedOut } from "#be/guards";
import { FindByUserIdDto } from "#be/apis/v1/users/dto/find-by-user-id.dto";

@Controller("apis/v1/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  async getMe(@Req() req: Request) {
    return {
      payload: req.user,
    };
  }

  @UseGuards(IsLoggedOut)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return {
      toast: {
        title: "회원가입 완료",
        description: `회원가입을 축하드립니다.\n메인 페이지로 이동합니다!`,
      },
      payload: await this.usersService.create(createUserDto),
    };
  }

  /** FIXME: 미사용 */
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /** FIXME: 미사용 */
  @Get(":userId")
  findOne(@Param() findByIdDto: FindByUserIdDto) {
    return this.usersService.findOne(findByIdDto);
  }

  /** FIXME: 미사용 */
  @UseGuards(IsLoggedIn)
  @Patch(":userId")
  update(
    @Param() findByIdDto: FindByUserIdDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(findByIdDto, updateUserDto);
  }

  /** FIXME: 미사용 */
  @Delete(":userId")
  delete(@Param() findByIdDto: FindByUserIdDto) {
    return this.usersService.delete(findByIdDto);
  }

  /** @see 내부적으로 사용 */
  @Post("/check/email")
  hasDuplicateEmail(@Body() checkEmailDto: CheckEmailDto) {
    return this.usersService.hasDuplicateEmail(checkEmailDto);
  }

  /** @see 내부적으로 사용 */
  @Post("/check/nickname")
  hasDuplicateNickname(@Body() checkNicknameDto: CheckNicknameDto) {
    return this.usersService.hasDuplicateNickname(checkNicknameDto);
  }

  /** @see 내부적으로 사용 */
  @Post("/check/phone")
  hasDuplicatePhone(@Body() checkPhoneDto: CheckPhoneDto) {
    return this.usersService.hasDuplicatePhone(checkPhoneDto);
  }

  /** FIXME: 미사용 */
  @Post("/validate")
  validate(@Body() validateUserDto: ValidateUserDto) {
    return this.usersService.validate(validateUserDto);
  }

  /** FIXME: 미사용 */
  /** 임시 계정 생성 */
  @Post("/ephemeral")
  createEphemeral() {
    return this.usersService.createEphemeral();
  }
}
