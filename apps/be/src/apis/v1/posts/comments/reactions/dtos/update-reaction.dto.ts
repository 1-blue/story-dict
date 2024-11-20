import { PartialType } from "@nestjs/mapped-types";

import { CreateReactionDto } from "#be/apis/v1/posts/reactions/dtos/create-reaction.dto";

export class UpdateReactionDto extends PartialType(CreateReactionDto) {}
