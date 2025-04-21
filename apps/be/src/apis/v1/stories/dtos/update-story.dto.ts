import { PartialType } from "@nestjs/mapped-types";

import { CreateStoryDto } from "#be/apis/v1/stories/dtos/create-story.dto";

export class UpdateStoryDto extends PartialType(CreateStoryDto) {}
