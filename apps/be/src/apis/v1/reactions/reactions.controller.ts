import type { Request } from "express";
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";

import { ReactionsService } from "#be/apis/v1/reactions/reactions.service";
import { CreateReactionDto } from "#be/apis/v1/reactions/dtos/create-reaction.dto";
import { UpdateReactionDto } from "#be/apis/v1/reactions/dtos/update-reaction.dto";
import { FindByReactionIdDto } from "#be/apis/v1/reactions/dtos/find-by-reaction-id.dto";
import { IsLoggedIn } from "#be/guards";

@Controller("apis/v1/reactions")
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @UseGuards(IsLoggedIn)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Req() req: Request, @Body() createReactionDto: CreateReactionDto) {
    return this.reactionsService.create(req.user!.id, createReactionDto);
  }

  @UseGuards(IsLoggedIn)
  @Patch(":reactionId")
  update(
    @Param() findByIdDto: FindByReactionIdDto,
    @Body() updateReactionDto: UpdateReactionDto,
  ) {
    return this.reactionsService.update(findByIdDto, updateReactionDto);
  }

  @UseGuards(IsLoggedIn)
  @Delete(":reactionId")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() findByIdDto: FindByReactionIdDto) {
    return this.reactionsService.delete(findByIdDto);
  }
}
