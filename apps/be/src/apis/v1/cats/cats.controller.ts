import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";

import { FindByIdDto } from "#be/dtos/find-by-id.dto";
import { CatsService } from "#be/apis/v1/cats/cats.service";
import { CreateCatDto } from "#be/apis/v1/cats/dto/create-cat.dto";
import { UpdateCatDto } from "#be/apis/v1/cats/dto/update-cat.dto";

@Controller("apis/v1/cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(":id")
  findOne(@Param() findByIdDto: FindByIdDto) {
    return this.catsService.findOne(findByIdDto);
  }

  @Patch(":id")
  update(
    @Param() findByIdDto: FindByIdDto,
    @Body() updateCatDto: UpdateCatDto,
  ) {
    return this.catsService.update(findByIdDto, updateCatDto);
  }

  @Delete(":id")
  delete(@Param() findByIdDto: FindByIdDto) {
    return this.catsService.delete(findByIdDto);
  }
}
