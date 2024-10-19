import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";

import { ReactionsService } from "#be/apis/v1/reactions/reactions.service";
import { CreateReactionDto } from "#be/apis/v1/reactions/dtos/create-reaction.dto";
import { UpdateReactionDto } from "#be/apis/v1/reactions/dtos/update-reaction.dto";
import { FindByIdDto } from "#be/dtos/find-by-id.dto";

@Controller("apis/v1/reactions")
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @Post()
  create(@Body() createReactionDto: CreateReactionDto) {
    return this.reactionsService.create(createReactionDto);
  }

  @Put(":id")
  update(
    @Param() findByIdDto: FindByIdDto,
    @Body() updateReactionDto: UpdateReactionDto,
  ) {
    return this.reactionsService.update(findByIdDto, updateReactionDto);
  }

  @Delete(":id")
  delete(@Param() findByIdDto: FindByIdDto) {
    return this.reactionsService.delete(findByIdDto);
  }
}
