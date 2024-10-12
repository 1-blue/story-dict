import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from "@nestjs/common";
import type { Request } from "express";

import { FindByIdDto } from "#be/dtos/find-by-id.dto";
import { UsersService } from "#be/apis/v1/users/users.service";
import { CreateUserDto } from "#be/apis/v1/users/dto/create-user.dto";
import { UpdateUserDto } from "#be/apis/v1/users/dto/update-user.dto";
import { CheckEmailDto } from "#be/apis/v1/users/dto/check-email.dto";
import { CheckNicknameDto } from "#be/apis/v1/users/dto/check-nickname.dto";
import { CheckPhoneDto } from "#be/apis/v1/users/dto/check-phone.dto";
import { ValidateUserDto } from "#be/apis/v1/users/dto/validate-user.dto";

@Controller("apis/v1/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  getMe(@Req() req: Request) {
    return req.user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param() findByIdDto: FindByIdDto) {
    return this.usersService.findOne(findByIdDto);
  }

  @Patch(":id")
  update(
    @Param() findByIdDto: FindByIdDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(findByIdDto, updateUserDto);
  }

  @Delete(":id")
  delete(@Param() findByIdDto: FindByIdDto) {
    return this.usersService.delete(findByIdDto);
  }

  @Post("/check/email")
  hasDuplicateEmail(@Body() checkEmailDto: CheckEmailDto) {
    return this.usersService.hasDuplicateEmail(checkEmailDto);
  }

  @Post("/check/nickname")
  hasDuplicateNickname(@Body() checkNicknameDto: CheckNicknameDto) {
    return this.usersService.hasDuplicateNickname(checkNicknameDto);
  }

  @Post("/check/phone")
  hasDuplicatePhone(@Body() checkPhoneDto: CheckPhoneDto) {
    return this.usersService.hasDuplicatePhone(checkPhoneDto);
  }

  @Post("/validate")
  validate(@Body() validateUserDto: ValidateUserDto) {
    return this.usersService.validate(validateUserDto);
  }

  /** 임시 계정 생성 */
  @Post("/ephemeral")
  createEphemeral() {
    return this.usersService.createEphemeral();
  }
}
