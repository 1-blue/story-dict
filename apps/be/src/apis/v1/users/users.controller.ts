import { Controller, Get, Post, Body, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";

import { UsersService } from "#be/apis/v1/users/users.service";
import { CreateUserDto } from "#be/apis/v1/users/dto/create-user.dto";
import { IsLoggedOut } from "#be/guards";

@Controller("apis/v1/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  async getMe(@Req() req: Request) {
    return {
      payload: req.user ?? null,
    };
  }

  @UseGuards(IsLoggedOut)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return {
      toast: {
        title: "회원가입 완료",
        description: `회원가입을 축하드립니다.\n메인 페이지로 이동합니다!`,
      },
      payload: await this.usersService.create(createUserDto),
    };
  }
}
