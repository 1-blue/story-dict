import { PartialType } from "@nestjs/mapped-types";

import { CreateCatDto } from "#be/apis/v1/cats/dto/create-cat.dto";

export class UpdateCatDto extends PartialType(CreateCatDto) {}
