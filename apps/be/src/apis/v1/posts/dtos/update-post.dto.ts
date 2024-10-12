import { PartialType } from "@nestjs/mapped-types";

import { CreatePostDto } from "#be/apis/v1/posts/dtos/create-post.dto";

export class UpdatePostDto extends PartialType(CreatePostDto) {}
