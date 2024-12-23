import { PartialType } from "@nestjs/mapped-types";

import { CreateCommentDto } from "#be/apis/v1/posts/comments/dtos/create-comment.dto";

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
