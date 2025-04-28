import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Delete,
  Patch,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import type { Request } from "express";

import { IsLoggedIn, IsLoggedOut } from "#be/guards";
import { UsersService } from "#be/apis/v1/users/users.service";
import {
  CreateUserBodyDTO,
  CreateUserResponseDTO,
  DeleteUserResponseDTO,
  GetMeResponseDTO,
  UpdateUserDTO,
  UpdateUserResponseDTO,
} from "#be/apis/v1/users/dtos";

@Controller("apis/v1/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  @ApiOperation({ summary: "내 정보 조회" })
  @ApiResponse({
    status: 200,
    description: "사용자 정보 조회 성공",
    type: GetMeResponseDTO,
  })
  async getMe(@Req() req: Request) {
    return {
      payload: req.user ?? null,
    };
  }

  @UseGuards(IsLoggedOut)
  @Post()
  @ApiOperation({ summary: "회원가입" })
  @ApiBody({ type: CreateUserBodyDTO })
  @ApiResponse({
    status: 200,
    description: "회원가입 성공",
    type: CreateUserResponseDTO,
  })
  async create(@Body() bodyDTO: CreateUserBodyDTO) {
    return {
      toast: {
        title: "회원가입 완료",
        description: `회원가입을 축하드립니다.\n메인 페이지로 이동합니다!`,
      },
      payload: await this.usersService.create(bodyDTO),
    };
  }

  @UseGuards(IsLoggedIn)
  @Patch()
  @ApiOperation({ summary: "회원정보 수정" })
  @ApiBody({ type: UpdateUserDTO })
  @ApiResponse({
    status: 200,
    description: "회원정보 수정 성공",
    type: UpdateUserResponseDTO,
  })
  async update(@Req() req: Request, @Body() bodyDTO: UpdateUserDTO) {
    return {
      toast: {
        title: "회원정보 수정 완료",
        description: `회원정보를 수정했습니다.\n메인 페이지로 이동합니다!`,
      },
      payload: await this.usersService.update(
        { userId: req.user!.id },
        bodyDTO,
      ),
    };
  }

  @UseGuards(IsLoggedIn)
  @Delete()
  @ApiOperation({ summary: "회원탈퇴" })
  @ApiResponse({
    status: 200,
    description: "회원탈퇴 성공",
    type: DeleteUserResponseDTO,
  })
  async delete(@Req() req: Request) {
    return {
      toast: {
        title: "회원탈퇴 완료",
        description: `회원탈퇴를 완료했습니다.\n메인 페이지로 이동합니다!`,
      },
      payload: await this.usersService.delete({ userId: req.user!.id }),
    };
  }
}
